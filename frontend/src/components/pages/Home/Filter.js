import React, { Component } from 'react'
import { Input, Button } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom'

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
    const { count, url } = this.props
    return (
      <div className="py-2 align-items-center d-flex justify-content-around" style={{ fontSize: '1rem' }}>
        <div>
          Total: {count}
        </div>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <Input
              onChange={this.handleInputCheck}
              checked={completeAll}
              type="checkbox"
              className="mt-0"
            /> Select All
          </div>
          <NavLink
            className="ml-5"
            to={{
              pathname: `${url}`,
              search: "?sort=all", // use querystring!
            }}
          >
            All
          </NavLink>
          <NavLink
            className="ml-5"
            to={{
              pathname: `${url}`,
              search: "?sort=active",
            }}
          >
            Active
          </NavLink>
          <NavLink
            className="ml-5"
            to={{
              pathname: `${url}`,
              search: "?sort=completed",
            }}
          >
            Completed
          </NavLink>
        </div>
        <div>
          <Button disabled size="md" color="link">Clear Completed</Button>
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
  url: PropTypes.string.isRequired,
}

const mapStateToProps = ({ todos }) => ({
  completeAll: todos.ids.map(id => todos.entities[id]).every(todo => todo.complete),
  count: todos.count
})
const mapDispatchToProps = {
  toggleAll
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Filter))
