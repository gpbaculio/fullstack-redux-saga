import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input } from 'reactstrap'
import PropTypes from 'prop-types'

import { getSearchParams, updateSearchParams } from '../../todosPaginationConfig';

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateSearchParams
  },
  dispatch
);

const mapStateToProps = (state) => ({
  searchPhrase: getSearchParams(state).searchPhrase
});

class Search extends Component {
  inputChanged = (event) => {
    const {
      onSearchPhraseChanged: onSearchPhraseChangedAction,
      updateSearchParams: updateSearchParamsAction
    } = this.props
    onSearchPhraseChangedAction(event.target.value);
    updateSearchParamsAction({ searchPhrase: event.target.value });
  }

  render() {
    const { searchPhrase } = this.props
    return (
      <div className="justify-content-center mt-4 mb-5 mx-auto w-75">
        <Input
          placeholder="Search your todos"
          value={searchPhrase}
          onChange={this.inputChanged}
        />
      </div>
    );
  }
}

Search.propTypes = {
  searchPhrase: PropTypes.string.isRequired,
  updateSearchParams: PropTypes.func.isRequired,
  onSearchPhraseChanged: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
