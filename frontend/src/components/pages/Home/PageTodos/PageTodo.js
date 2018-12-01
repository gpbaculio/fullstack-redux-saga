import React, { Component } from 'react'
import { connect } from 'react-redux'
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
import { toggleTodoCompleteByUserRequest } from '../../../../actions/todo'

class PageTodo extends Component {

  state = {
    isEditing: false
  }

  handleInputCheck = () => {
    const {
      todo,
      userId,
      toggleTodoCompleteByUserRequest: toggleTodoCompleteByUserRequestAction
    } = this.props
    toggleTodoCompleteByUserRequestAction({ userId, todo })
  }

  handleIsEditing = () => {
    this.setState(state => ({
      isEditing: !state.isEditing
    }))
  }

  render() {
    const { isEditing } = this.state
    const { todo } = this.props
    return (
      <Col lg="4" md="6" sm="12">
        <Card className="mx-auto mt-4 w-75 p-3">
          <CardBody>
            <CardTitle
              style={{
                textDecoration: todo.complete ? 'line-through' : 'none'
              }}
              className="d-flex"
            >
              <Input
                onChange={this.handleInputCheck}
                checked={todo.complete}
                type="checkbox"
              />
              {isEditing ? <TodoInput /> : (
                <div onDoubleClick={this.handleIsEditing} className="mx-auto">
                  {todo.text}
                </div>)}
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
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  }).isRequired,
  toggleTodoCompleteByUserRequest: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
})

const mapDispatchToProps = {
  toggleTodoCompleteByUserRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTodo)
