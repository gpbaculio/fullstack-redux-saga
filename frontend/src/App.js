import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ClipLoader } from 'react-spinners';
import { css } from 'react-emotion';
import { Alert } from 'reactstrap'

import {
  SignUpPage,
  LoginPage,
  HomePage,
  ConfirmationPage
} from './components/pages'
import { GuestRoute, UserRoute } from './components/routes'
import { Header } from './components/navigation'
import { fetchCurrentUserRequest, fetchCurrentUserSuccess, clearUserError } from './actions/user';
import setAuthorizedHeader from './utils/setAuthorizedHeader'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class App extends React.Component {

  componentDidMount = async () => {
    const token = localStorage.getItem('gpbTodosJWT')
    await setAuthorizedHeader(token)
    const {
      fetchCurrentUserRequest: fetchUser,
      fetchCurrentUserSuccess: fetchUserSuccess
    } = this.props
    if (token && !`${window.location.href}`.includes('/confirmation')) {
      await fetchUser()
    } else {
      await fetchUserSuccess({})
    }
  }

  clearError = () => {
    const { clearUserErrorAction } = this.props
    clearUserErrorAction()
  }

  render() {
    const { isAuthenticated, loading, error } = this.props
    return (<React.Fragment>
      {
        loading ? <ClipLoader
          className={override}
          sizeUnit="px"
          size={100}
          color='#123abc'
          loading={loading}
        /> :
          <React.Fragment>
            <Header />
            {error && (
              <Alert style={{ width: '33%' }} color="danger" className="mx-auto text-center" isOpen={Boolean(error)} toggle={this.clearError}>
                {error}
              </Alert>
            )}
            <Switch>
              <Route
                exact
                path="/confirmation/:token"
                component={ConfirmationPage}
              />
              <GuestRoute
                path="/signup"
                exact
                component={SignUpPage}
              />
              <GuestRoute
                path="/login"
                exact
                component={LoginPage}
              />
              <UserRoute
                exact
                isAuthenticated={isAuthenticated}
                path="/(home)?/:filter?"
                component={HomePage}
              />
            </Switch>
          </React.Fragment>
      }
    </React.Fragment>
    )
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  fetchCurrentUserSuccess: PropTypes.func.isRequired,
  fetchCurrentUserRequest: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  clearUserErrorAction: PropTypes.func.isRequired,
}
const mapStateToProps = ({ user }) => ({
  isAuthenticated: !!user.id,
  loading: user.loading,
  error: user.error
})
const mapDispatchToProps = {
  fetchCurrentUserSuccess,
  fetchCurrentUserRequest,
  clearUserErrorAction: clearUserError
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
