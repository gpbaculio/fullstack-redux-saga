import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'

import { SignUpPage, LoginPage, HomePage, ConfirmationPage } from './components/pages'
import { GuestRoute, UserRoute } from './components/routes'
import { Header } from './components/navigation'
import { fetchCurrentUserRequest, fetchCurrentUserSuccess } from './actions/user';
import setAuthorizedHeader from './utils/setAuthorizedHeader'
import { fetchTodosByUserRequest } from './actions/todo'

class App extends React.Component {

  componentDidMount = () => {
    const {
      location,
      fetchCurrentUserRequest: fetchCurrentUserRequestAction,
      fetchCurrentUserSuccess: fetchCurrentUserSuccessAction,
    } = this.props

    const token = localStorage.getItem('gpbTodosJWT')

    if (token && !location.pathname.includes('/confirmation')) {
      setAuthorizedHeader(token)
      fetchCurrentUserRequestAction()
    } else {
      fetchCurrentUserSuccessAction({})
    }
  }

  componentDidUpdate = () => {
    const {
      id,
      fetchTodosByUserRequest: fetchTodosByUserRequestAction
    } = this.props

    if (id) { // the user has been fetched
      fetchTodosByUserRequestAction()
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
  id: PropTypes.string.isRequired,
  fetchCurrentUserRequest: PropTypes.func.isRequired,
  fetchCurrentUserSuccess: PropTypes.func.isRequired,
  fetchTodosByUserRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  id: state.user.id
})

const mapDispatchToProps = {
  fetchCurrentUserRequest,
  fetchCurrentUserSuccess,
  fetchTodosByUserRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
