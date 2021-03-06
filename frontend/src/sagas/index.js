import { takeLatest } from 'redux-saga/effects'

import {
  createUserSaga,
  fetchUserSaga,
  logInUserSaga,
  userConfirmTokenSaga,
  fetchTodosByUserSaga
} from './userSagas';

import {
  CREATE_USER_REQUEST,
  FETCH_CURRENT_USER_REQUEST,
  LOGIN_USER_REQUEST,
  USER_CONFIRM_TOKEN_REQUEST,
  FETCH_TODOS_BY_USER_REQUEST,
} from "../types";

export default function* rootSaga() {
  yield takeLatest(CREATE_USER_REQUEST, createUserSaga)
  yield takeLatest(LOGIN_USER_REQUEST, logInUserSaga)
  yield takeLatest(FETCH_CURRENT_USER_REQUEST, fetchUserSaga)
  yield takeLatest(USER_CONFIRM_TOKEN_REQUEST, userConfirmTokenSaga)
  yield takeLatest(FETCH_TODOS_BY_USER_REQUEST, fetchTodosByUserSaga)
}