import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'

import {
  getTotalElements,
  ELEMENTS_PER_PAGE,
  getCurrentPage,
  setCurrentPage
} from '../../../todosPaginationConfig';

const mapStateToProps = (state) => {
  const totalItemsCount = getTotalElements(state);
  const activePage = getCurrentPage(state).pageNumber;
  return {
    totalItemsCount,
    activePage,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setCurrentPage
}, dispatch)

class Paginator extends Component {

  constructor(props) {
    super(props);
    this.onChosenPageChanged = this.onChosenPageChanged.bind(this);
  }

  onChosenPageChanged(page) {
    const { setCurrentPage: setCurrentPageAction } = this.props
    setCurrentPageAction(page);
  }

  render() {
    const { totalItemsCount, activePage } = this.props;
    return (
      <Pagination
        activePage={activePage}
        itemsCountPerPage={ELEMENTS_PER_PAGE}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={5}
        onChange={this.onChosenPageChanged}
      />
    );
  }
}
Paginator.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalItemsCount: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(Paginator)