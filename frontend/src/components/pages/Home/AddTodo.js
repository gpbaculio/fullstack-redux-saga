import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addTodoByUserRequest } from '../../../actions/todo'

class AddTodo extends Component {

  state = {
    todoText: '',
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    });
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { addTodoByUserRequest: addTodo, userId } = this.props
    const { todoText } = this.state
    if(todoText){
      await addTodo({ todoText:todoText.trim(), userId })
      this.setState({ todoText: '' });
    }
  };

  render() {
    const { todoText } = this.state
    const { disableField } = this.props
    return (
      <form
        className="
          form-inline
          justify-content-center
          mx-auto
          mt-4
          mb-xs-1
          mb-md-5
          align-items-start
        "
        onSubmit={this.onSubmit}
      >
        <input
          type="text"
          id="todoText"
          name="todoText"
          value={todoText}
          placeholder="Add Todo"
          disabled={disableField}
          onChange={this.onChange}
          className="form-control w-75"
        />
      </form>
    )
  }
}

AddTodo.propTypes = {
  addTodoByUserRequest: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  disableField: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ user, todos}) => ({
  userId: user.id,
  loading: todos.loading,
  disableField: todos.disableField
})

const mapDispatchToProps = {
 addTodoByUserRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)
