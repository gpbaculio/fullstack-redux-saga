import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Alert } from 'reactstrap'
import { ClipLoader } from 'react-spinners';
import { css } from 'react-emotion';

import { fetchTodosByUserRequest, setPage } from '../../../actions/todo'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

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
      loading
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
  loading: PropTypes.bool.isRequired,
  activePage: PropTypes.number.isRequired,
}

const mapStateToProps = ({ todos }) => ({
  count: todos.count,
  sort: todos.sort,
  loading: todos.loading,
  activePage: todos.page
})

const mapDispatchToProps = {
  fetchTodos: fetchTodosByUserRequest,
  setPage
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginator)