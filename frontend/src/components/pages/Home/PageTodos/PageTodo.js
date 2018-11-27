import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input } from 'reactstrap'
import PropTypes from 'prop-types'
import moment from 'moment'

import { toggleTodoCompleteByUserRequest } from '../../../../actions/todo'

class PageTodo extends Component {

  handleInputCheck = () => {
    const {
      todo,
      userId,
      toggleTodoCompleteByUserRequest: toggleTodoCompleteByUserRequestAction
    } = this.props
    const { _id: id, complete } = todo
    toggleTodoCompleteByUserRequestAction({ todoId: id, userId, complete })
  }

  render() {
    const { todo } = this.props
    return (
      <div key={todo._id} className="col-lg-4 col-md-6 col-sm-12">
        <div className="card mx-auto mt-3 w-75">
          <div className="card-body">
            <h5 className="card-title text-center">
              <Input onChange={this.handleInputCheck} type="checkbox" />
              {todo.text}
            </h5>
            <div className="card-text my-3 text-center">
              <div style={{ borderBottom: 'solid black 1px', fontSize: '15px' }}>
                {todo.createdAt === todo.updatedAt ?
                  moment(todo.createdAt).format('LLLL') : `${moment(todo.updatedAt).format('LLLL')} Edited`}
              </div>
              <div style={{ fontSize: '14px' }}>
                {`Date ${todo.createdAt === todo.updatedAt ? 'Added' : 'Edited'}`}
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
