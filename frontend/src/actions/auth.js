import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_CONFIRM_TOKEN_REQUEST,
  USER_CONFIRM_TOKEN_SUCCESS,
  USER_CONFIRM_TOKEN_FAILURE,
} from '../types'

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const userConfirmTokenRequest = token => ({
  type: USER_CONFIRM_TOKEN_REQUEST,
  token
})

export const userConfirmTokenSuccess = email => ({
  type: USER_CONFIRM_TOKEN_SUCCESS,
  email
})

export const userConfirmTokenFailure = error => ({
  type: USER_CONFIRM_TOKEN_FAILURE,
  error
})