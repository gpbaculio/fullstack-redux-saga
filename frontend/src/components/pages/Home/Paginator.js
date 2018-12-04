import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Alert } from 'reactstrap'

import { fetchTodosByUserRequest, setPage } from '../../../actions/todo'

class Paginator extends Component {

  onPageChange = page => {
    const { fetchTodos, setPage: setStatePage, sort } = this.props
    fetchTodos({ page, sort, sortFirst: -1 })
    setStatePage(page)
  }

  render() {
    const {
      activePage,
      count,
      sort,
      loading,
      countPerPage
    } = this.props
    return (
      <React.Fragment>
        {!count && !loading ? (
          <Alert color="primary">
            You have no {sort === 'all' ? '' : sort} todos yet.
          </Alert>
        ) : (
            <Pagination
              activePage={activePage}
              itemsCountPerPage={countPerPage}
              totalItemsCount={count}
              pageRangeDisplayed={5}
              onChange={this.onPageChange}
            />)}
      </React.Fragment>
    );
  }
}

Paginator.propTypes = {
  fetchTodos: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  activePage: PropTypes.number.isRequired,
  countPerPage: PropTypes.number.isRequired,
}

const mapStateToProps = ({ todos }) => ({
  count: todos.count,
  sort: todos.sort,
  loading: todos.loading,
  activePage: todos.page,
  countPerPage: todos.countPerPage
})

const mapDispatchToProps = {
  fetchTodos: fetchTodosByUserRequest,
  setPage
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginator)