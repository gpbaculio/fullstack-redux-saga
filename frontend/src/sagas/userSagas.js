import { call, put } from 'redux-saga/effects'
import { userLoggedIn } from '../actions/auth'
import { createUserFailure } from '../actions/user'
import api from '../api'

export function* createUserSaga(action) {
  try {
    const user = yield call(api.user.signup, action.user)
    localStorage.setItem('bookWormJWT', user.token)
    yield put(userLoggedIn(user))
  } catch (e) {
    console.log('e - ', e)
    yield put(createUserFailure(e.response.data.errors))
  }
}