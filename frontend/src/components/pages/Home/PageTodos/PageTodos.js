import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ClipLoader } from 'react-spinners';
import { css } from 'react-emotion';
import PropTypes from 'prop-types'

import {
  getCurrentPage,
  getPage,
  loadTodosPage,
} from '../../../../todosPaginationConfig';
import PageTodo from './PageTodo';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const mapDispatchToProps = dispatch => bindActionCreators(
  { loadTodosPage },
  dispatch
);

const mapStateToProps = (state) => {
  const chosenPage = getCurrentPage(state).pageNumber;
  const page = getPage(state, chosenPage);
  return {
    chosenPage,
    page
  };
};

class PageTodos extends Component {
  componentDidMount() {
    const { loadTodosPage: loadTodosPageAction } = this.props
    loadTodosPageAction(1);
  }

  componentDidUpdate() {
    // Typical usage (don't forget to compare props):
    const { chosenPage } = this.props
    if (chosenPage) {
      const { loadTodosPage: loadTodosPageAction } = this.props
      loadTodosPageAction(chosenPage);
    }
  }

  // eslint-disable-next-line consistent-return
  render() {
    const { page } = this.props;
    if (!page) {
      return <div>no data</div>;
    }
    if (page.isFetching) {
      return (
        <div className="py-5 my-5 p-absolute m-auto w-100 text-center d-flex flex-column">
          <ClipLoader
            className={override}
            sizeUnit="px"
            size={45}
            color='#123abc'
            loading={page.isFetching}
          />
          Loading...
        </div>
      );
    }

    if (page.isSuccess || page.isRefreshing) {
      if (page.elements.length === 0) {
        return <div>elements not found</div>;
      }

      const content = page.elements.map((todo) => (
        <PageTodo key={todo._id} todo={todo} />
      ));
      return (
        <React.Fragment>
          {page.isRefreshing &&
            <div className="pb-4 p-absolute m-auto w-100 text-center d-flex flex-column">
              <ClipLoader
                className={override}
                sizeUnit="px"
                size={45}
                color='#123abc'
                loading={page.isRefreshing}
              />
              refreshing...
            </div>}
          {content}
        </React.Fragment>
      );
    }

    if (page.isFailed) {
      return <div>isFailed</div>;
    }
  }
}

PageTodos.defaultProps = {
  page: null
}
PageTodos.propTypes = {
  page: PropTypes.shape({
    elements: PropTypes.array.isRequired,
    isFailed: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    isSuccess: PropTypes.bool.isRequired,
  }),
  loadTodosPage: PropTypes.func.isRequired,
  chosenPage: PropTypes.number.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTodos);
