import React, { Component } from 'react'
import { Input } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { toggleAll } from '../../../actions/todo'

class Filter extends Component {

  state = {
    completeAll: false
  }

  handleInputCheck = () => {
    this.setState(state => ({
      completeAll: !state.completeAll
    }), () => {
      const { completeAll: complete } = this.state
      const { toggleAll: toggleAllTodo } = this.props
      toggleAllTodo(complete)
    })
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

Filter.propTypes = {
  toggleAll: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  toggleAll
}

export default connect(null, mapDispatchToProps)(Filter)
