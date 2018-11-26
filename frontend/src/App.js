import React from 'react';
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import { SignUpPage, LoginPage, HomePage, ConfirmationPage } from './components/pages'
import { GuestRoute, UserRoute } from './components/routes'
import { Header } from './components/navigation'

const App = ({ location }) => (
  <React.Fragment>
    <Header />
    <Route
      location={location}
      path="/confirmation/:token"
      component={ConfirmationPage}
    />
    <UserRoute
      location={location}
      path="/home"
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


App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
};

export default App;
