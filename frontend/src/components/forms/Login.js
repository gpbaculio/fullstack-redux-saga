import React from "react";
import { Link } from "react-router-dom";
import Validator from "validator";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { logInUserRequest, resetFormState } from '../../actions/user'

class LoginForm extends React.Component {

  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {}
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.serverErrors) {
      return {
        errors: nextProps.serverErrors
      }
    }
    return null;
  }

  componentWillUnmount() {
    const { reset } = this.props
    reset({ logIn: {} })
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
    if (!Validator.isEmail(data.email)) {
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
        {errors.global && (
          <div className="alert alert-danger">{errors.global}</div>
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
          </label>
          <div className="invalid-feedback">{errors.email}</div>
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
          </label>
          <div className="invalid-feedback">{errors.password}</div>
        </div>

        <Button disabled={loading} type="submit" color="primary" className="btn-block">
          Login
        </Button>

        <small className="form-text text-center">
          <Link to="/signup">Sign up</Link> if you do not have an account<br />
          <Link to="/forgot_password">Forgot Password?</Link>
        </small>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.formErrors.loading,
  serverErrors: state.formErrors.signUp
})

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, {
  submit: logInUserRequest,
  reset: resetFormState
})(LoginForm)
