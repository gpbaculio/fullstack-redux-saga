import React, { Component } from 'react'
import { Input, Button, Col, Row } from 'reactstrap'
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
      setPage: setStatePage,
      searchText
    } = this.props
    history.push(`${url}?sort=${name}`) // from withRouter
    const { search } = history.location
    const { sort } = queryString.parse(search);
    const query = { page: 1, sort }
    if (searchText) {
      query.searchText = searchText
    }
    setStatePage(1)
    fetchTodos(query)
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
      <Row className="my-3">
        <Col lg="2" className="d-flex justify-content-center align-items-center">
          Total: {count}
        </Col>
        <Col lg="8" className="filter d-flex justify-content-center align-items-center">
          <div className="d-flex align-items-center">
            <Input
              onChange={this.handleInputCheck}
              checked={completeAll}
              type="checkbox"
              className="mt-0"
            />
            {completeAll ? 'Deselect All' : 'Select All'}
          </div>
          <div className="nav-container d-flex justify-content-around">
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
        </Col>
        <Col lg="2" className="d-flex align-items-center justify-content-center">
          <Button
            disabled={!enableClear}
            onClick={this.onDeleteCompleted}
            size="md"
            color="link"
          >
            Clear Completed
          </Button>
        </Col>
      </Row>
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
  searchText: PropTypes.string.isRequired,
}

const mapStateToProps = ({ todos }) => ({
  completeAll: _.every(_.map(todos.ids, id => todos.entities[id]), todo => todo.complete),
  enableClear: _.some(_.map(todos.ids, id => todos.entities[id]), todo => todo.complete),
  count: todos.count,
  page: todos.page,
  sort: todos.sort,
  todos: todos.ids.map(id => todos.entities[id]),
  searchText: todos.searchText
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
