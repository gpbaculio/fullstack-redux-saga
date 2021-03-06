import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router'
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

  componentDidUpdate(_, { errors }, ) {
    const { signUpError } = this.props
    if (signUpError !== errors.email) {
      this.setState({ errors: { email: signUpError } })
    }
  }

  componentWillUnmount() {
    const { reset } = this.props
    reset({ signUp: '' })
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
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      submit(data);
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
    const { loading } = this.props
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
            <div className="invalid-feedback">{errors.password}</div>
          </label>
        </div>
        <Button
          disabled={loading}
          type="submit"
          color="primary"
          className="btn-block"
        >
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
  loading: state.formErrors.loading,
  signUpError: state.formErrors.signUp
})

SignUpForm.propTypes = {
  submit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  signUpError: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, {
  submit: createUserRequest,
  reset: resetFormState
})(withRouter(SignUpForm))
