import React from "react";
import PropTypes from "prop-types";
import { LoginForm } from "../forms";

const LoginPage = () => (
  <div className="container" style={{ height: "100vh" }}>
    <div className="row align-items-center" style={{ height: "100vh" }}>
      <div className="col col-xs-12 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3">
        <div className="card">
          <h2 className="card-header">Welcome Back!</h2>
          <div className="card-body">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  </div>
);

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

export default LoginPage;
