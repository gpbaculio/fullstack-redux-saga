import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ClipLoader } from 'react-spinners';
import { css } from 'react-emotion';
import moment from 'moment'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'

import {
  getCurrentPage,
  getPage,
  loadTodosPage,
} from '../../../todosPaginationConfig';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadTodosPage
  },
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

class PageItem extends Component {
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
        <div key={todo._id} className="col-lg-4 col-md-6 col-sm-12">
          <div className="card mx-auto mt-3 w-75">
            <div className="card-body">
              <h5 className="card-title text-center">
                <Input type="checkbox" />
                {todo.text}
              </h5>
              <div className="card-text my-3 text-center">
                <div style={{ borderBottom: 'solid black 1px', fontSize: '15px' }}>{todo.createdAt === todo.updatedAt ? moment(todo.createdAt).format('LLLL') : `${moment(todo.updatedAt).format('LLLL')} Edited`}</div>
                <div style={{ fontSize: '14px' }}>Date Added</div>
              </div>
            </div>
          </div>
        </div>
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

PageItem.defaultProps = {
  page: null
}
PageItem.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(PageItem);
