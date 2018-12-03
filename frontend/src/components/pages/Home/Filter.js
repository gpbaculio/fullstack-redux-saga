import React, { Component } from 'react'
import { Input, Button } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom' // for history
import queryString from 'query-string'

import { toggleAll, fetchTodosByUserRequest } from '../../../actions/todo'

class Filter extends Component {

  state = {
    completeAll: false,
    sort: ''
  }

  componentDidUpdate = (prevProps) => {
    const { completeAll } = this.props
    if (completeAll !== prevProps.completeAll) {
      this.setState({ completeAll })
    }
  }

  componentDidMount = () => {
    const { completeAll } = this.props
    this.setState({ completeAll })
  }

  handleInputCheck = () => {
    this.setState(state => ({
      completeAll: !state.completeAll
    }), () => {
      const { completeAll: complete } = this.state
      const { toggleAll: toggleAllTodo } = this.props
      toggleAllTodo(complete)
    })
  }



  handleFilterLinkClick = e => {
    const { name } = e.target
    const {
      url,
      history,
      fetchTodosByUserRequest: fetchTodos,
      page
    } = this.props
    history.push(`${url}?sort=${name}`) // from withRouter
    const { search } = history.location
    const { sort } = queryString.parse(search);
    this.setState({ sort })
    const query = { page }
    if (sort === 'all') {
      query.complete = null
    } else if (sort === 'active') {
      query.complete = false
    } else {
      query.complete = true
    }
    fetchTodos(query)
  }

  render() {
    const { completeAll, sort } = this.state
    const { count } = this.props
    return (
      <div className="py-2 align-items-center d-flex justify-content-around" style={{ fontSize: '1rem' }}>
        <div>
          Total: {count}
        </div>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <Input
              onChange={this.handleInputCheck}
              checked={completeAll}
              type="checkbox"
              className="mt-0"
            /> Select All
          </div>
          <Button
            onClick={this.handleFilterLinkClick}
            size="md"
            color="link"
            name="all"
            disabled={sort === '' || sort === 'all'}
          >
            All
          </Button>
          <Button
            onClick={this.handleFilterLinkClick}
            size="md"
            color="link"
            name="active" // complete = false
            disabled={sort === 'active'}
          >
            Active
          </Button>
          <Button
            onClick={this.handleFilterLinkClick}
            size="md"
            color="link"
            name="complete"
            disabled={sort === 'complete'}
          >
            Completed
          </Button>
        </div>
        <div>
          <Button disabled size="md" color="link">Clear Completed</Button>
        </div>
      </div>
    )
  }
}

Filter.defaultProps = {
  completeAll: false
}

Filter.propTypes = {
  toggleAll: PropTypes.func.isRequired,
  completeAll: PropTypes.bool,
  count: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  page: PropTypes.number.isRequired,
  fetchTodosByUserRequest: PropTypes.func.isRequired,
}

const mapStateToProps = ({ todos }) => ({
  completeAll: todos.ids.map(id => todos.entities[id]).every(todo => todo.complete),
  count: todos.count,
  page: todos.page
})
const mapDispatchToProps = {
  toggleAll,
  fetchTodosByUserRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Filter))
