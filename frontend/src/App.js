import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'

import { SignUpPage, LoginPage, HomePage, ConfirmationPage } from './components/pages'
import { GuestRoute, UserRoute } from './components/routes'
import { Header } from './components/navigation'
import { fetchTodosByUserRequest } from './actions/todo'

class App extends React.Component {

  // componentDidUpdate = () => {
  //   const {
  //     id,
  //     fetchTodosByUserRequest: fetchTodosByUserRequestAction
  //   } = this.props

  //   if (id) { // the user has been fetched
  //     fetchTodosByUserRequestAction()
  //   }
  // }

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
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  id: PropTypes.bool.isRequired,
  fetchCurrentUserRequest: PropTypes.func.isRequired,
  fetchCurrentUserSuccess: PropTypes.func.isRequired,
  fetchTodosByUserRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  id: !!state.user.id
})

const mapDispatchToProps = {
  fetchTodosByUserRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
