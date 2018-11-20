import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { ClipLoader } from 'react-spinners';
import { css } from 'react-emotion';

import { userConfirmTokenRequest } from '../../actions/auth'
import { resetFormState } from '../../actions/user'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Confirmation extends Component {

  state = {
    errors: {}
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.serverErrors) {
      return {
        errors: nextProps.serverErrors
      }
    }
    return null;
  }

  componentDidMount = () => {
    const { submit, match } = this.props
    submit(match.params.token)
  }

  componentWillUnmount = () => {
    const { reset } = this.props
    reset({ confirmToken: {} })
  }

  render() {
    return (
      <React.Fragment>
        s
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.formErrors.loading,
  serverErrors: state.formErrors.confirmToken,
  confirmed: !!state.user.confirmed
})

Confirmation.propTypes = {
  submit: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  confirmed: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, {
  submit: userConfirmTokenRequest,
  reset: resetFormState
})(Confirmation)