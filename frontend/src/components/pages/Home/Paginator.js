import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Alert } from 'reactstrap'

import { fetchTodosByUserRequest, setPage } from '../../../actions/todo'

class Paginator extends Component {

  onPageChange = page => {
    const { fetchTodos, setPage: setStatePage, sort } = this.props
    const query = { page }
    if (sort === 'all') {
      query.complete = null
    } else if (sort === 'active') {
      query.complete = false
    } else {
      query.complete = true
    }
    fetchTodos(query)
    setStatePage(page)
  }

  render() {
    const {
      activePage,
      count,
      sort,
      completeCount,
      activeCount,
      loading
    } = this.props
    if (loading) {
      return null
    }
    if (count && !completeCount && sort === 'complete') {
      return <Alert color="primary"> You have no {sort === 'all' ? '' : sort} todos yet. </Alert>
    }
    if (count && !activeCount && sort === 'active') {
      return <Alert color="primary"> You have no {sort === 'all' ? '' : sort} todos yet. </Alert>
    }
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
  completeCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  activePage: PropTypes.number.isRequired,
}

const mapStateToProps = ({ todos }) => ({
  count: todos.count,
  sort: todos.sort,
  completeCount: todos.ids.map(id => todos.entities[id])
    .filter(({ complete }) => complete).length,
  activeCount: todos.ids.map(id => todos.entities[id])
    .filter(({ complete }) => !complete).length,
  loading: todos.loading,
  activePage: todos.page
})

const mapDispatchToProps = {
  fetchTodos: fetchTodosByUserRequest,
  setPage
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginator)