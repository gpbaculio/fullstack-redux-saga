import React from "react";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { withRouter } from 'react-router'

import { logInUserRequest, resetFormState } from '../../actions/user'

class LoginForm extends React.Component {

  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {
      serverError: ''
    }
  };

  componentDidUpdate(_, { errors }, ) {
    const { loginError } = this.props
    if (loginError !== errors.serverError) {
      this.setState({ errors: { serverError: loginError } })
    }
  }

  componentWillUnmount() {
    const { reset } = this.props
    reset({ logIn: '' })
  }

  onChange = e => {
    const { data } = this.state
    const { name, value } = e.target
    this.setState({
      data: { ...data, [name]: value }
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { data } = this.state
    const { submit } = this.props
    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      await submit(data);
    }
  };

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) {
      errors.email = "Invalid email";
    }
    if (!data.password) {
      errors.password = "Can't be blank";
    }
    return errors;
  };

  render() {
    const { data, errors } = this.state;
    const { loading } = this.props
    return (
      <form onSubmit={this.onSubmit}>
        {errors.serverError && (
          <div className="alert alert-danger">{errors.serverError}</div>
        )}
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={this.onChange}
              className={
                errors.email ? "form-control is-invalid" : "form-control"
              }
            />
            <div className="invalid-feedback">{errors.email}</div>
          </label>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Password
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={this.onChange}
              className={
                errors.password ? "form-control is-invalid" : "form-control"
              }
            />
            <div className="invalid-feedback">{errors.password}</div>
          </label>
        </div>

        <Button disabled={loading} type="submit" color="primary" className="btn-block">
          Login
        </Button>

        <small className="form-text text-center">
          <Link to="/signup">Sign up</Link> if you do not have an account<br />
        </small>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.formErrors.loading,
  loginError: state.formErrors.logIn
})

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loginError: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, {
  submit: logInUserRequest,
  reset: resetFormState
})(withRouter(LoginForm))
