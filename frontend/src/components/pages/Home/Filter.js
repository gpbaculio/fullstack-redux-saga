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
    const { count } = this.props
    return (
      <div className="py-2 d-flex justify-content-around">
        <div>
          Total: {count}
        </div>
        <div className="d-flex">
          <div>
            <Input
              onChange={this.handleInputCheck}
              checked={completeAll}
              type="checkbox"
            /> Select All
          </div>
          <div className="ml-5">
            All
          </div>
          <div className="ml-5">
            Active
          </div>
          <div className="ml-5">
            Completed
          </div>
        </div>
        <div>
          Clear Completed
        </div>
      </div>
    )
  }
}
Filter.defaultProps = {
  completeAll: false
}
Filter.propTypes = {
  toggleAll: PropTypes.func.isRequired,
  completeAll: PropTypes.bool,
  count: PropTypes.number.isRequired,
}
const mapStateToProps = ({ todos }) => ({
  completeAll: todos.ids.map(id => todos.entities[id]).every(todo => todo.complete),
  count: todos.count
})
const mapDispatchToProps = {
  toggleAll
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
