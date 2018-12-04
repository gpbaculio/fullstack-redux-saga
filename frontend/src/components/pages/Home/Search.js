import React, { Component } from 'react'
import { Input, Form } from 'reactstrap'

class Search extends Component {
  
  state = {
    text: ''
  }

  onChange = e => {
    this.setState({ text: e.target.value })
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

export default Search