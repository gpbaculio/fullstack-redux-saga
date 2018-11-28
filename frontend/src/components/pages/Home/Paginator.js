import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchTodosByUserRequest } from '../../../actions/todo'

class Paginator extends Component {

  state = {
    activePage: 1
  }

  onChosenPageChanged = async (page) => {
    const { fetchTodos } = this.props
    await fetchTodos(page)
    this.setState({ activePage: page })
  }

  render() {
    const { activePage } = this.state
    const { count } = this.props
    return (
      <Pagination
        activePage={activePage}
        itemsCountPerPage={9}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        onChange={this.onChosenPageChanged}
      />
    );
  }
}

Paginator.propTypes = {
  fetchTodos: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
}

const mapStateToProps = ({ todos }) => ({
  count: todos.count
})

const mapDispatchToProps = {
  fetchTodos: fetchTodosByUserRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginator)