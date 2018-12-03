import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { ClipLoader } from 'react-spinners';
import { css } from 'react-emotion';

import PageTodo from './PageTodo'
import { fetchTodosByUserRequest } from '../../../../actions/todo'

const override = css`
    display: block;
    margin: 3rem auto;
    border-color: red;
`;

class PageTodos extends Component {

  componentDidMount = () => {
    const { fetchTodos, sort } = this.props
    fetchTodos({ sort, page: 1 })
  }

  render() {
    const { ids, entities, loading } = this.props
    return (
      <React.Fragment>
        {loading ? (
          <ClipLoader
            className={override}
            sizeUnit="px"
            size={100}
            color='#123abc'
            loading={loading}
          />
        ) : ids.map(id =>
          <PageTodo
            key={entities[id]._id}
            todo={entities[id]}
          />)}
      </React.Fragment>
    )
  }
}

PageTodos.defaultProps = {
  entities: {}
}

PageTodos.propTypes = {
  entities: PropTypes.shape({}),
  ids: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  fetchTodos: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ todos }) => ({
  entities: todos.entities,
  ids: todos.ids,
  sort: todos.sort,
  loading: todos.loading
})

const mapDispatchToProps = {
  fetchTodos: fetchTodosByUserRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTodos)