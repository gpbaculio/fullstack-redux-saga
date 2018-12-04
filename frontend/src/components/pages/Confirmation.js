import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { ClipLoader } from 'react-spinners';
import { css } from 'react-emotion';
import { Alert, Container } from "reactstrap";

import { userConfirmTokenRequest } from '../../actions/auth'
import { resetFormState } from '../../actions/user'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Confirmation extends Component {

  state = {
    error: ''
  }

  componentDidUpdate(_, { error }, ) {
    const { confirmTokenError } = this.props
    if (confirmTokenError !== error) {
      this.setState({ error: confirmTokenError })
    }
  }

  componentDidMount = () => {
    const { submit, match } = this.props
    submit(match.params.token)
  }

  componentWillUnmount = () => {
    const { reset } = this.props
    reset({ confirmToken: '' })
  }

  render() {
    const { loading, confirmed, email } = this.props
    const { error } = this.state
    return (
      <Container>
        <ClipLoader
          className={override}
          sizeUnit="px"
          size={100}
          color='#123abc'
          loading={loading}
        />
        {error && (
          <Alert color="danger">
            <h3 className="alert-heading text-center">{error}</h3>
          </Alert>
        )}
        {confirmed && (
          <Alert color="success">
            <h4 className="alert-heading">Congratulations! <strong>{email}</strong> You have successfully verified your account</h4>
          </Alert>
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.formErrors.loading,
  confirmTokenError: state.formErrors.confirmToken,
  confirmed: !!state.user.confirmed,
  email: state.user.email
})

Confirmation.defaultProps = {
  confirmTokenError: ''
}

Confirmation.propTypes = {
  submit: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  confirmed: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  confirmTokenError: PropTypes.string,
}

export default connect(mapStateToProps, {
  submit: userConfirmTokenRequest,
  reset: resetFormState
})(Confirmation)