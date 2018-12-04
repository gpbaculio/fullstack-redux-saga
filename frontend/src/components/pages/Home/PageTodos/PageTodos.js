import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import PageTodo from './PageTodo'
import { fetchTodosByUserRequest } from '../../../../actions/todo'

class PageTodos extends Component {

  componentDidMount = () => {
    const { fetchTodos, sort } = this.props
    fetchTodos({ sort, page: 1, refetching: false })
  }

  render() {
    const { ids, entities, sort } = this.props
    if (sort !== 'all') {
      return ids
        .map(id => entities[id])
        .filter(t => sort === 'active' ? !t.complete : t.complete)
        .map(t => <PageTodo key={t._id} todo={t} />)
    }
    return ids.map(id =>
      <PageTodo
        key={entities[id]._id}
        todo={entities[id]}
      />)
  }
}

PageTodos.defaultProps = {
  entities: {}
}

PageTodos.propTypes = {
  entities: PropTypes.shape({}),
  ids: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  fetchTodos: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
}

const mapStateToProps = ({ todos }) => ({
  entities: todos.entities,
  ids: todos.ids,
  sort: todos.sort,
  refetching: todos.refetching
})

const mapDispatchToProps = {
  fetchTodos: fetchTodosByUserRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTodos)