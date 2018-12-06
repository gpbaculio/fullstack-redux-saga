import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon } from 'react-icons-kit'
import { remove } from 'react-icons-kit/fa/remove'
import {
  Input,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap'
import PropTypes from 'prop-types'

import TodoInput from './TodoInput'

import { timeDifferenceForDate } from '../../../../utils/timeDifference'
import {
  toggleTodoCompleteByUserRequest,
  deleteTodo,
  fetchTodosByUserRequest,
  showRefresh,
} from '../../../../actions/todo'

class PageTodo extends Component {

  state = {
    isEditing: false,
  }

  handleInputCheck = () => {
    const {
      todo,
      userId,
      toggleTodoCompleteByUserRequest: toggleTodoCompleteByUserRequestAction,
      showRefreshButton,
      sort,
      deleteTodo: deleteTodoRequest,
    } = this.props
    toggleTodoCompleteByUserRequestAction({ userId, todo })
    if (sort !== 'all') {
      showRefreshButton()
      deleteTodoRequest(todo._id)
    }
  }

  handleIsEditing = () => {
    this.setState(state => ({
      isEditing: !state.isEditing
    }))
  }

  onDelete = () => {
    const {
      deleteTodo: deleteTodoRequest,
      todo,
      showRefreshButton,
    } = this.props
    deleteTodoRequest(todo._id)
    showRefreshButton()
  }

  render() {
    const { isEditing } = this.state
    const { todo } = this.props
    return (
      <Col lg="4" md="6" sm="12">
        <Card className="mx-auto mt-4 w-75 p-3">
          <CardBody>
            <CardTitle className="d-flex justify-content-between">
              <Input
                onChange={this.handleInputCheck}
                checked={todo.complete}
                type="checkbox"
              />
              {isEditing ? (
                <TodoInput
                  id={todo._id}
                  text={todo.text}
                  handleIsEditing={this.handleIsEditing}
                />
              ) : (
                  <div
                    onDoubleClick={this.handleIsEditing}
                    style={{
                      textDecoration: todo.complete ? 'line-through' : 'none',
                      cursor: 'pointer'
                    }}
                    className="mx-auto"
                  >
                    {todo.text}
                  </div>
                )}
              <Icon
                onClick={this.onDelete}
                style={{
                  color: 'red',
                  cursor: 'pointer'
                }}
                icon={remove}
              />
            </CardTitle>
            <CardText
              className="mt-2 text-center"
              style={{ borderTop: 'solid black 1px' }}
            >
              {todo.createdAt === todo.updatedAt ?
                `Added ${timeDifferenceForDate(todo.createdAt)}`
                : `Updated ${timeDifferenceForDate(todo.updatedAt)}`}
            </CardText>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

PageTodo.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  }).isRequired,
  toggleTodoCompleteByUserRequest: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  showRefreshButton: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
}

const mapStateToProps = ({ user, todos }) => ({
  userId: user.id,
  page: todos.page,
  sort: todos.sort
})

const mapDispatchToProps = {
  toggleTodoCompleteByUserRequest,
  deleteTodo,
  showRefreshButton: showRefresh,
  fetchTodos: fetchTodosByUserRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTodo)
