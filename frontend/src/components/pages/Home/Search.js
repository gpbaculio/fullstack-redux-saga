import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Form } from 'reactstrap'
import PropTypes from 'prop-types'

import { fetchTodosByUserRequest} from '../../../actions/todo'

class Search extends Component {
  
  state = {
    text: ''
  }

  onChange = e => {
    this.setState({ text: e.target.value })
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { text } = this.state
    const { fetcTodos, sort } = this.props
    await fetcTodos({ page: 1, sort, searchText: text})
  }

  render() {
    const { text} = this.state
    return (
      <Form
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
      <Input
        placeholder="Search your todos"
        value={text}
        className="form-control w-75"
        onChange={this.onChange}
      />
    </Form>
    )
  }
}
Search.propTypes = {
  fetcTodos: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
}
const mapStateToProps = ({todos}) => ({
  sort: todos.sort
})

const mapDispatchToProps = {
  fetcTodos:fetchTodosByUserRequest
}


export default connect(mapStateToProps, mapDispatchToProps)(Search)