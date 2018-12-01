import React, { Component } from 'react'
import { Input } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { editTodo } from '../../../../actions/todo'

class TodoInput extends Component {

  state = {
    text: ''
  };

  componentDidMount = () => {
    const { text } = this.props
    this.setState({ text })
  }

  onBlur = () => {
    const { text } = this.state
    const {
      editTodo: editTodoRequest,
      handleIsEditing,
      id
    } = this.props
    editTodoRequest({ id, text })
    handleIsEditing()
  }

  onChange = e => {
    const { value } = e.target
    this.setState({
      text: value
    });
  }

  render() {
    const { text } = this.state
    return (
      <Input
        type="text"
        value={text}
        onChange={this.onChange}
        onBlur={this.onBlur}
      />
    )
  }
}

TodoInput.propTypes = {
  editTodo: PropTypes.func.isRequired,
  handleIsEditing: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

const mapDispatchToProps = {
  editTodo
}

export default connect(null, mapDispatchToProps)(TodoInput)
