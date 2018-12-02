import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const UserRoute = ({ isAuthenticated, loading, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !loading && isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

UserRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
    loading: state.user.loading
  };
}

export default connect(mapStateToProps)(UserRoute);
