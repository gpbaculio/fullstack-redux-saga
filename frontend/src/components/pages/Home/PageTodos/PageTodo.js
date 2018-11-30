import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input } from 'reactstrap'
import PropTypes from 'prop-types'
import { timeDifferenceForDate } from '../../../../utils/timeDifference'

import { toggleTodoCompleteByUserRequest } from '../../../../actions/todo'

class PageTodo extends Component {

  handleInputCheck = () => {
    const {
      todo,
      userId,
      toggleTodoCompleteByUserRequest: toggleTodoCompleteByUserRequestAction
    } = this.props
    toggleTodoCompleteByUserRequestAction({ userId, todo })
  }

  render() {
    const { todo } = this.props
    return (
      <div key={todo._id} className="col-lg-4 col-md-6 col-sm-12">
        <div className="card mx-auto mt-4 w-75">
          <div className="card-body">
            <h5 style={{ textDecoration: todo.complete ? 'line-through' : 'none' }} className="card-title text-center">
              <Input onChange={this.handleInputCheck} checked={todo.complete} type="checkbox" />
              {todo.text}
            </h5>
            <div className="card-text mt-2 text-center">
              <div style={{ fontSize: '15px' }}>
                {todo.createdAt === todo.updatedAt ?
                  `Added ${timeDifferenceForDate(todo.createdAt)}` : `Edited ${timeDifferenceForDate(todo.updatedAt)}`}
              </div>
            </div>
          </div>
        </div>
      </div>
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
