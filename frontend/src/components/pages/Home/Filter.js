import React, { Component } from 'react'
import { Input } from 'reactstrap'

class Filter extends Component {

  state = {
    completeAll: false
  }

  handleInputCheck = () => {
    this.setState(state => ({
      completeAll: !state.completeAll
    }))
  }

  render() {
    const { completeAll } = this.state
    return (
      <React.Fragment>
        <Input
          onChange={this.handleInputCheck}
          checked={completeAll}
          type="checkbox"
        />
      </React.Fragment>
    )
  }
}
export default Filter
