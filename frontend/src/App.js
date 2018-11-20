import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'

import { SignUpPage, LoginPage, HomePage, ConfirmationPage } from './components/pages'
import { GuestRoute, UserRoute } from './components/routes'
import { Header } from './components/navigation'
import { fetchCurrentUserRequest } from './actions/user';

class App extends React.Component {

  componentDidMount = () => {
    const { location } = this.props;
    const { isAuthenticated, fetchCurrentUserRequest: fetchCurrentUserRequestAction } = this.props
    if (isAuthenticated && !!location.pathname.includes('/confirmation/')) {
      console.log('fetchcurrentuser!!!!')
      fetchCurrentUserRequestAction()
    }
  }

  render() {
    const { location } = this.props
    return (
      <React.Fragment>
        <Header />
        <Route
          location={location}
          path="/confirmation/:token"
          component={ConfirmationPage}
        />
        <UserRoute
          location={location}
          path="/(home)"
          component={HomePage}
        />
        <GuestRoute
          location={location}
          path="/signup"
          exact
          component={SignUpPage}
        />
        <GuestRoute
          location={location}
          path="/login"
          exact
          component={LoginPage}
        />
      </React.Fragment>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  fetchCurrentUserRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.user.email
})

const mapDispatchToProps = {
  fetchCurrentUserRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
