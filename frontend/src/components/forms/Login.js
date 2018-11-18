import React from "react";
import { Link } from "react-router-dom";
import Validator from "validator";

class LoginForm extends React.Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {}
  };

  onChange = e => {
    const { data } = this.state
    const { name, value } = e.target
    this.setState({
      data: { ...data, [name]: value }
    });
  }

  onSubmit = e => {
    e.preventDefault();
    // const errors = this.validate(this.state.data);
    // this.setState({ errors });
    // if (Object.keys(errors).length === 0) {
    //   this.setState({ loading: true });
    //   this.props
    //     .submit(this.state.data)
    //     .catch(err =>
    //       this.setState({ errors: err.response.data.errors, loading: false })
    //     );
    // }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
    const { data, errors } = this.state;

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

        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>

        <small className="form-text text-center">
          <Link to="/signup">Sign up</Link> if you do not have an account<br />
          <Link to="/forgot_password">Forgot Password?</Link>
        </small>
      </form>
    );
  }
}

// LoginForm.propTypes = {
//   submit: PropTypes.func.isRequired
// };

export default LoginForm;
