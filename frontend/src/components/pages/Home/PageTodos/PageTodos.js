import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import PageTodo from './PageTodo'
import { fetchTodosByUserRequest } from '../../../../actions/todo'

class PageTodos extends Component {

  componentDidMount = () => {
    const { fetchTodos } = this.props
    fetchTodos(1)
  }

  render() {
    const { ids, entities } = this.props
    return (
      <div className="container">
        <div className="row">
          {ids.map(id => {
            const todo = entities[id]
            return <PageTodo key={todo._id} todo={todo} />
          })}
        </div>
      </div>
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
}

const mapStateToProps = ({ todos }) => ({
  entities: todos.entities,
  ids: todos.ids
})

const mapDispatchToProps = {
  fetchTodos: fetchTodosByUserRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTodos)