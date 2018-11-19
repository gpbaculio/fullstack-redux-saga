import { call, put } from 'redux-saga/effects'

import { userLoggedIn } from '../actions/auth'
import { createUserFailure, logInUserFailure } from '../actions/user'
import api from '../api'
import history from '../history'

export function* createUserSaga(action) {
  try {
    const user = yield call(api.user.signup, action.user)
    yield put(userLoggedIn(user)) // put dispatches an action!
    localStorage.setItem('bookWormJWT', user.token)
    history.push('/home')
  } catch (e) {
    yield put(createUserFailure(e.response.data.errors))
  }
}

export function* logInUserSaga(action) {
  try {
    const user = yield call(api.user.login, action.credentials)
    yield put(userLoggedIn(user))
    localStorage.setItem('bookWormJWT', user.token)
    history.push('/home')
  } catch (e) {
    yield put(logInUserFailure(e.response.data.errors))
  }
}

export function* fetchUserSaga() {
  const user = yield call(api.user.fetchCurrentUser);
  yield put(userLoggedIn(user))
}