import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import PageTodo from './PageTodo'
import { fetchTodosByUserRequest } from '../../../../actions/todo'

class PageTodos extends Component {

  componentDidMount = () => {
    const { fetchTodos } = this.props
    fetchTodos(({ page: 1 }))
  }

  render() {
    const { ids, entities, sort } = this.props
    return (
      <React.Fragment>
        {sort === 'all' ?
          ids.map(id => (
            <PageTodo
              key={entities[id]._id}
              todo={entities[id]}
            />
          )) :
          ids.map(id => entities[id])
            .filter(todo => sort === 'active' ? !todo.complete : todo.complete)
            .map(todo => (
              <PageTodo
                key={todo._id}
                todo={todo}
              />
            ))}
      </React.Fragment>
    )
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
})

const mapDispatchToProps = {
  fetchTodos: fetchTodosByUserRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTodos)