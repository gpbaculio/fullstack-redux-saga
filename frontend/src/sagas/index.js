import { takeLatest } from 'redux-saga/effects'
import { createUserSaga } from './userSagas';
import { CREATE_USER_REQUEST } from "../types";

export default function* rootSaga() {
  yield takeLatest(CREATE_USER_REQUEST, createUserSaga)
}