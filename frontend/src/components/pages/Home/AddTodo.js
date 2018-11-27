import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

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
    e.preventDefault();
    const { addTodo, userId } = this.props
    const { todoText } = this.state
    if (todoText) {
      await addTodo({ todoText, userId })
      this.setState({ todoText: '' });
    }
  };

  render() {
    const { todoText } = this.state
    const { loading } = this.props
    return (
      <form
        className="form-inline justify-content-center mx-auto mt-4 mb-xs-1 mb-md-5 align-items-start"
        onSubmit={this.onSubmit}
      >
        <div className="d-flex w-75">
          <input
            type="text"
            id="todoText"
            name="todoText"
            value={todoText}
            placeholder="Add Todo"
            onChange={this.onChange}
            className="form-control w-75"
          />
          <Button type="submit" disabled={!todoText || loading} color="primary" className="ml-3">Submit</Button>
        </div>
      </form>
    )
  }
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  loading: state.formErrors.loading,
})

const mapDispatchToProps = {
  addTodo: addTodoByUserRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)
