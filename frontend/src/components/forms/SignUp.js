import React from "react";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { connect } from "react-redux";
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'
import { createUserRequest, resetFormState } from '../../actions/user'

class SignUpForm extends React.Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {},
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
    reset()
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

    if (!isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";

    return errors;
  };

  render() {
    const { data, errors } = this.state;
    const { loaded } = this.props
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email
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
          <label className="form-label" htmlFor="password">
            Password
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

        <Button disabled={loaded} type="submit" color="primary" className="btn-block">
          Sign Up
        </Button>

        <small className="form-text text-center">
          or <Link to="/login">LOGIN</Link> if you have an account
        </small>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  loaded: state.formErrors.loaded,
  serverErrors: state.formErrors.signUp
})

SignUpForm.propTypes = {
  submit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, {
  submit: createUserRequest,
  reset: resetFormState
})(SignUpForm)
