import { takeLatest } from 'redux-saga/effects'

import {
  createUserSaga,
  fetchUserSaga,
  logInUserSaga
} from './userSagas';

import {
  CREATE_USER_REQUEST,
  FETCH_CURRENT_USER_REQUEST,
  LOGIN_USER_REQUEST
} from "../types";

export default function* rootSaga() {
  yield takeLatest(CREATE_USER_REQUEST, createUserSaga)
  yield takeLatest(LOGIN_USER_REQUEST, logInUserSaga)
  yield takeLatest(FETCH_CURRENT_USER_REQUEST, fetchUserSaga)
}