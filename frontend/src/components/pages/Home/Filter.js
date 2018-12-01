import React, { Component } from 'react'
import { Input } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { toggleAll } from '../../../actions/todo'

class Filter extends Component {

  state = {
    completeAll: false
  }

  componentDidUpdate = (prevProps) => {
    const { completeAll } = this.props
    if (completeAll !== prevProps.completeAll) {
      this.setState({ completeAll })
    }
  }

  componentDidMount = () => {
    const { completeAll } = this.props
    this.setState({ completeAll })
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
      <div className="py-2 d-flex justify-content-center">
        <div className="mx-3">
          <Input
            onChange={this.handleInputCheck}
            checked={completeAll}
            type="checkbox"
          /> Select All
        </div>
        <div className="mx-3">
          All
        </div>
        <div className="mx-3">
          Active
        </div>
        <div className="mx-3">
          Completed
        </div>
      </div>
    )
  }
}

Filter.propTypes = {
  toggleAll: PropTypes.func.isRequired,
  completeAll: PropTypes.bool.isRequired,
}
const mapStateToProps = ({ todos }) => ({
  completeAll: todos.ids.map(id => todos.entities[id]).every(todo => todo.complete),
})
const mapDispatchToProps = {
  toggleAll
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
