import { call, put } from 'redux-saga/effects'

import {
  userLoggedIn,
  userLoggedOut,
  userConfirmTokenSuccess,
  userConfirmTokenFailure
} from '../actions/auth'
import {
  fetchTodosByUserSuccess,
  fetchTodosByUserFailure,
} from '../actions/todo'
import {
  createUserFailure,
  logInUserFailure
} from '../actions/user'
import api from '../api'
import history from '../history'
import setAuthorizationHeader from '../utils/setAuthorizedHeader'

export function* createUserSaga(action) {
  try {
    const user = yield call(api.user.signup, action.user)
    yield put(userLoggedIn(user)) // put dispatches an action!
    localStorage.setItem('gpbTodosJWT', user.token)
    history.push('/')
  } catch (e) {
    yield put(createUserFailure(e.response.data.errors))
  }
}

export function* logInUserSaga(action) {
  try {
    const user = yield call(api.user.login, action.credentials)
    yield put(userLoggedIn(user))
    localStorage.setItem('gpbTodosJWT', user.token)
    setAuthorizationHeader(user.token)
    history.push('/')
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

// export function* addTodoByUserSaga({ todoTextWithUserId }) {
//   try {
//     const todoWithUserData = yield call(api.todo.addTodoByUser, todoTextWithUserId)
//     yield put(addTodoByUserSuccess(todoWithUserData))
//   } catch (e) {
//     yield put(addTodoByUserFailure(e.response.data.errors))
//   }
// }

export function* fetchTodosByUserSaga({ data }) {
  try {
    const { page, searchText, sort } = data
    const limit = 9
    const offset = (page - 1) * limit
    const query = { page, searchText, limit, offset }

    if (sort === 'all') {
      query.complete = null
    } else if (sort === 'active') {
      query.complete = false
    } else {
      query.complete = true
    }

    const { count, todos } = yield call(api.todo.fetchTodosByUser, query)
    yield put(fetchTodosByUserSuccess({ count, todos }))
  } catch (e) {
    yield put(fetchTodosByUserFailure(e.response.data.errors))
  }
}
