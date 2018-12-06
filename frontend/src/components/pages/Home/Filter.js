import React, { Component } from 'react'
import { Input, Button } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom' // for history
import queryString from 'query-string'
import _ from 'lodash'

import {
  toggleAll,
  fetchTodosByUserRequest,
  setSort,
  setPage,
  deleteCompleted,
  showRefresh
} from '../../../actions/todo'

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
    this.setState(({ completeAll }) => ({
      completeAll: !completeAll
    }), async () => {
      const { completeAll: complete } = this.state
      const {
        toggleAll: toggleAllTodo,
        page,
        sort,
        fetchTodosByUserRequest: fetchTodos,
      } = this.props
      await toggleAllTodo(complete)
      if (sort !== 'all') {
        await fetchTodos({ sort, page })
      }
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
    fetchTodos({ page: 1, sort })
    setSorting(sort)
  }

  onDeleteCompleted = () => {
    const {
      deleteCompleted: onDeleteCompleted,
      showRefreshButton,
      sort
    } = this.props
    onDeleteCompleted()
    if (sort === 'all') {
      showRefreshButton()
    }
  }

  render() {
    const { completeAll } = this.state
    const { count, sort, enableClear } = this.props
    return (
      <div
        className="py-2 align-items-center d-flex justify-content-around"
        style={{ fontSize: '1rem' }}
      >
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
            />
            {completeAll ? 'Deselect All' : 'Select All'}
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
          <Button
            disabled={!enableClear}
            onClick={this.onDeleteCompleted}
            size="md"
            color="link"
          >
            Clear Completed
          </Button>
        </div>
      </div>
    )
  }
}

Filter.defaultProps = {
  completeAll: false,
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
  deleteCompleted: PropTypes.func.isRequired,
  enableClear: PropTypes.bool.isRequired,
  showRefreshButton: PropTypes.func.isRequired,
}

const mapStateToProps = ({ todos }) => ({
  completeAll: _.every(_.map(todos.ids, id => todos.entities[id]), todo => todo.complete),
  enableClear: _.some(_.map(todos.ids, id => todos.entities[id]), todo => todo.complete),
  count: todos.count,
  page: todos.page,
  sort: todos.sort,
  todos: todos.ids.map(id => todos.entities[id])
})

const mapDispatchToProps = {
  toggleAll,
  fetchTodosByUserRequest,
  setSort,
  setPage,
  deleteCompleted,
  showRefreshButton: showRefresh,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Filter))
