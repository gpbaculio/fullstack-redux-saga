import { call, put } from 'redux-saga/effects'
import _ from 'lodash'
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
  logInUserFailure,
  fetchCurrentUserFailure
} from '../actions/user'
import api from '../api'
import history from '../history'
import setAuthorizationHeader from '../utils/setAuthorizedHeader'

export function* createUserSaga(action) {
  try {
    const response = yield call(api.user.signup, action.user)
    const { user } = response.data
    yield put(userLoggedIn(user))
    localStorage.setItem('gpbTodosJWT', user.token)
    setAuthorizationHeader(user.token)
    history.push('/')
  } catch (e) {
    yield put(createUserFailure(e.response.data.error))
  }
}

export function* logInUserSaga(action) {
  try {
    const response = yield call(api.user.login, action.credentials)
    const { user } = response.data
    yield put(userLoggedIn(user))
    localStorage.setItem('gpbTodosJWT', user.token)
    setAuthorizationHeader(user.token)
    history.push('/')
  } catch (e) {
    yield put(logInUserFailure(e.response.data.error))
  }
}

export function* fetchUserSaga() {
  try {
    const response = yield call(api.user.fetchCurrentUser);
    const { user } = response.data
    yield put(userLoggedIn(user))
  } catch (e) {
    yield put(fetchCurrentUserFailure(e.response.data.error))
    localStorage.removeItem('gpbTodosJWT')
    yield put(userLoggedOut())
  }
}

export function* userConfirmTokenSaga(action) {
  try {
    localStorage.removeItem('gpbTodosJWT')
    yield put(userLoggedOut())
    const response = yield call(api.user.confirm, action.token)
    const { user } = response.data
    yield put(userConfirmTokenSuccess(user.email))
  } catch (e) {
    yield put(userConfirmTokenFailure(e.response.data.error))
  }
}

export function* fetchTodosByUserSaga({ data }) {
  try {
    const { page, searchText, sort, limit, onDelete } = data
    const offset = (page - 1) * 9
    const query = { page, searchText, limit: 9, offset }
    if (limit) {
      query.limit = limit
    }
    if (onDelete) {
      query.offset -= 1
    }
    if (sort === 'all') {
      query.complete = null
    } else if (sort === 'active') {
      query.complete = false
    } else {
      query.complete = true
    }
    const response = yield call(api.todo.fetchTodosByUser, query)
    let { todos: entities } = response.data
    const { count } = response.data
    entities = {
      ..._.keyBy(
        { ...entities },
        todo => todo._id)
    }
    const ids = _.map({ ...entities }, '_id')
    yield put(fetchTodosByUserSuccess({ count, entities, ids }))
  } catch (e) {
    yield put(fetchTodosByUserFailure(e.response.data.errors))
  }
}
