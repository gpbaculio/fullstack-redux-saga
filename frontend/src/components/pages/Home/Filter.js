import React, { Component } from 'react'
import { Input, Button } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom' // for history
import queryString from 'query-string'

import { toggleAll, fetchTodosByUserRequest, setSort, setPage } from '../../../actions/todo'

class Filter extends Component {

  state = {
    completeAll: false,
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
      const {
        toggleAll: toggleAllTodo,
        page,
        sort,
        fetchTodosByUserRequest: fetchTodos,
      } = this.props
      const query = { page }
      if (sort === 'all') {
        query.complete = null
      } else if (sort === 'active') {
        query.complete = false
      } else {
        query.complete = true
      }
      toggleAllTodo(complete)
      fetchTodos(query)
    })
  }

  handleFilterLinkClick = e => {
    const { name } = e.target
    const {
      url,
      history,
      fetchTodosByUserRequest: fetchTodos,
      setSort: setSorting,
      setPage: setStatePage
    } = this.props
    history.push(`${url}?sort=${name}`) // from withRouter
    const { search } = history.location
    const { sort } = queryString.parse(search);
    setStatePage(1)
    const query = { page: 1 }
    if (sort === 'all') {
      query.complete = null
    } else if (sort === 'active') {
      query.complete = false
    } else {
      query.complete = true
    }
    fetchTodos(query)
    setSorting(sort)
  }

  render() {
    const { completeAll } = this.state
    const { count, sort } = this.props
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
  fetchTodosByUserRequest: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
}

const mapStateToProps = ({ todos }) => ({
  completeAll: todos.ids.map(id => todos.entities[id]).every(todo => todo.complete),
  count: (todos.sort === 'all') ? todos.count : todos.ids.map(id => todos.entities[id]).filter(todo => todos.sort === 'complete' ? todo.complete : !todo.complete).length,
  page: todos.page,
  sort: todos.sort,
})

const mapDispatchToProps = {
  toggleAll,
  fetchTodosByUserRequest,
  setSort,
  setPage
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Filter))
