import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Form, InputGroup, InputGroupAddon } from 'reactstrap'
import PropTypes from 'prop-types'

import { fetchTodosByUserRequest, setSearchText} from '../../../actions/todo'

class Search extends Component {
  
  state = {
    text: ''
  }

  onChange = e => {
    this.setState({ text: e.target.value.trim() })
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { text } = this.state
    const {
      fetcTodos,
      sort,
      setSearchText: setSearchTextAction
    } = this.props
    if(text){
      setSearchTextAction(text)
      await fetcTodos({ page: 1, sort, searchText: text})
    }
  }

  onClearText = () => {
    console.log('clear!')
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
      <InputGroup>
      <Input
        placeholder="Search your todos"
        value={text}
        className="form-control w-75"
        onChange={this.onChange}
      />
      <InputGroupAddon addonType="append">        
        clear
      </InputGroupAddon>
    </InputGroup>
    </Form>
    )
  }
}
Search.propTypes = {
  fetcTodos: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  setSearchText:PropTypes.func.isRequired,
}
const mapStateToProps = ({todos}) => ({
  sort: todos.sort
})

const mapDispatchToProps = {
  fetcTodos:fetchTodosByUserRequest,
  setSearchText
}


export default connect(mapStateToProps, mapDispatchToProps)(Search)