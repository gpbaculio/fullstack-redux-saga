import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { ClipLoader } from 'react-spinners';
import { css } from 'react-emotion';
import { Alert } from "reactstrap";

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
    const { loading, confirmed, email } = this.props
    const { errors } = this.state
    return (
      <div className="container">
        <ClipLoader
          className={override}
          sizeUnit="px"
          size={100}
          color='#123abc'
          loading={loading}
        />
        {errors.global && (
          <Alert color="danger">
            <h4 className="alert-heading">{errors.global}</h4>
          </Alert>
        )}
        {confirmed && (
          <Alert color="success">
            <h4 className="alert-heading">Congratulations! <strong>{email}</strong> You have successfully verified your account</h4>
          </Alert>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.formErrors.loading,
  serverErrors: state.formErrors.confirmToken,
  confirmed: !!state.user.confirmed,
  email: state.user.email ? state.user.email : false
})

Confirmation.propTypes = {
  submit: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  confirmed: PropTypes.bool.isRequired,
  email: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.bool.isRequired
  ]).isRequired,
  loading: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, {
  submit: userConfirmTokenRequest,
  reset: resetFormState
})(Confirmation)