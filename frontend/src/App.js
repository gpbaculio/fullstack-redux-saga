import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { SignUpPage, LoginPage, Homepage } from './components/pages'
import { GuestRoute, UserRoute } from './components/routes'
import { Header } from './components/navigation'
import { fetchCurrentUserRequest } from './actions/user';

class App extends React.Component {

  componentDidMount = () => {
    const { isAuthenticated, fetchCurrentUserRequest: fetchCurrentUserRequestAction } = this.props
    if (isAuthenticated) {
      fetchCurrentUserRequestAction()
    }
  }

  render() {
    const { location } = this.props
    return (
      <React.Fragment>
        <Header />
        <UserRoute
          location={location}
          path="/home"
          exact
          component={Homepage}
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
