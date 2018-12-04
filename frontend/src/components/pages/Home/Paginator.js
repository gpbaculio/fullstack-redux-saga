import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Alert, Button } from 'reactstrap'

import { fetchTodosByUserRequest, setPage } from '../../../actions/todo'

class Paginator extends Component {

  onPageChange = page => {
    const { fetchTodos, setPage: setStatePage, sort } = this.props
    fetchTodos({ page, sort })
    setStatePage(page)
  }

  onRefresh = () => {
    const { fetchTodos, sort, page } = this.props
    fetchTodos({ page, sort })
  }

  render() {
    const {
      activePage,
      count,
      sort,
      loading,
      countPerPage,
      showRefresh
    } = this.props
    return (
      <React.Fragment>
        {!count && !loading ? (
          <Alert color="primary">
            You have no {sort === 'all' ? '' : sort} todos yet.
          </Alert>
        ) : (
            <div className="d-flex flex-column mt-3">
              {showRefresh && (
                <Button
                  color="primary"
                  className="btn-block"
                  onClick={this.onRefresh}
                >
                  Refresh Page
                </Button>)}
              <Pagination
                activePage={activePage}
                itemsCountPerPage={countPerPage}
                totalItemsCount={count}
                pageRangeDisplayed={5}
                onChange={this.onPageChange}
              />
            </div>)}
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
  showRefresh: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ todos }) => ({
  count: todos.count,
  sort: todos.sort,
  loading: todos.loading,
  activePage: todos.page,
  countPerPage: todos.countPerPage,
  showRefresh: todos.showRefresh
})

const mapDispatchToProps = {
  fetchTodos: fetchTodosByUserRequest,
  setPage
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginator)