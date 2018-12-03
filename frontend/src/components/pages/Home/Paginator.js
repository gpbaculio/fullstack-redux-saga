import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Alert } from 'reactstrap'

import { fetchTodosByUserRequest, setPage } from '../../../actions/todo'

class Paginator extends Component {

  onPageChange = page => {
    const { fetchTodos, setPage: setStatePage, sort } = this.props
    fetchTodos({ page, sort })
    setStatePage(page)
  }

  render() {
    const {
      activePage,
      count,
      sort,
    } = this.props
    return (
      <React.Fragment>
        {!count ?
          <Alert color="primary"> You have no {sort === 'all' ? '' : sort} todos yet. </Alert> : (
            <Pagination
              activePage={activePage}
              itemsCountPerPage={9}
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
  activePage: PropTypes.number.isRequired,
}

const mapStateToProps = ({ todos }) => ({
  count: todos.count,
  sort: todos.sort,
  activePage: todos.page
})

const mapDispatchToProps = {
  fetchTodos: fetchTodosByUserRequest,
  setPage
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginator)