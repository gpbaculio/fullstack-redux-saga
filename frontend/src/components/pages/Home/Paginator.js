import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchTodosByUserRequest, setPage } from '../../../actions/todo'

class Paginator extends Component {

  state = {
    activePage: 1
  }

  onPageChange = (page) => {
    const { fetchTodos, setPage: setStatePage } = this.props
    fetchTodos({ page })
    this.setState({ activePage: page })
    setStatePage(page)
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
        onChange={this.onPageChange}
      />
    );
  }
}

Paginator.propTypes = {
  fetchTodos: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
}

const mapStateToProps = ({ todos }) => ({
  count: todos.count
})

const mapDispatchToProps = {
  fetchTodos: fetchTodosByUserRequest,
  setPage
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginator)