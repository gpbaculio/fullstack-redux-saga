import { call, put } from 'redux-saga/effects'

import { userLoggedIn, userLoggedOut, userConfirmTokenSuccess, userConfirmTokenFailure } from '../actions/auth'
import { addTodoSuccess, addTodoFailure } from '../actions/todo'
import { createUserFailure, logInUserFailure } from '../actions/user'
import api from '../api'
import history from '../history'

export function* createUserSaga(action) {
  try {
    const user = yield call(api.user.signup, action.user)
    yield put(userLoggedIn(user)) // put dispatches an action!
    localStorage.setItem('gpbTodosJWT', user.token)
    history.push('/home')
  } catch (e) {
    yield put(createUserFailure(e.response.data.errors))
  }
}

export function* logInUserSaga(action) {
  try {
    const user = yield call(api.user.login, action.credentials)
    yield put(userLoggedIn(user))
    localStorage.setItem('gpbTodosJWT', user.token)
    history.push('/home')
  } catch (e) {
    yield put(logInUserFailure(e.response.data.errors))
  }
}

export function* fetchUserSaga() {
  const user = yield call(api.user.fetchCurrentUser);
  yield put(userLoggedIn(user))
}

export function* userConfirmTokenSaga(action) {
  try {
    localStorage.removeItem('gpbTodosJWT')
    yield put(userLoggedOut())
    const { email } = yield call(api.user.confirm, action.token)
    yield put(userConfirmTokenSuccess(email))
  } catch (e) {
    yield put(userConfirmTokenFailure(e.response.data.errors))
  }
}

export function* addTodoSaga({ todoTextWithUserId }) {
  try {
    const todoWithUserData = yield call(api.todo.addTodo, todoTextWithUserId)
    yield put(addTodoSuccess(todoWithUserData))
  } catch (e) {
    yield put(addTodoFailure(e.response.data.errors))
  }
}