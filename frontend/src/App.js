import React from 'react';
import PropTypes from 'prop-types'

import { SignUpPage, LoginPage } from './components/pages'
import { GuestRoute } from './components/routes'
import { Header } from './components/navigation'

const App = ({ location }) => (
  <React.Fragment>
    <Header />
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
