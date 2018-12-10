import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Form, Button } from 'reactstrap'
import PropTypes from 'prop-types'

import {
  fetchTodosByUserRequest,
  setSearchText,
  clearSearchText
} from '../../../actions/todo'

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
    const {
      clearSearchTextAction,
      fetcTodos,
      sort,
      searchText
    } = this.props
    if(searchText){
      this.setState({ text: ''}, () => {
        clearSearchTextAction()
        fetcTodos({ page: 1, sort })
      })
    }
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
      <Button
        onClick={this.onClearText}
        style={{color: 'red', fontSize: '18px'}}
        className="border-0"
        color="link"
      >
        clear
      </Button>
    </Form>
    )
  }
}

Search.propTypes = {
  fetcTodos: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  setSearchText:PropTypes.func.isRequired,
  clearSearchTextAction: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
}

const mapStateToProps = ({todos}) => ({
  sort: todos.sort,
  searchText: todos.searchText
})

const mapDispatchToProps = {
  fetcTodos:fetchTodosByUserRequest,
  setSearchText,
  clearSearchTextAction: clearSearchText
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)