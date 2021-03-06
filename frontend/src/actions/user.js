import {
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_FAILURE,
  RESET_FORM_STATE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  CLEAR_USER_ERROR
} from '../types'

export const createUserRequest = user => ({
  type: CREATE_USER_REQUEST,
  user
})

export const createUserFailure = error => ({
  type: CREATE_USER_FAILURE,
  error
})

export const resetFormState = form => ({
  type: RESET_FORM_STATE,
  form
})

export const logInUserRequest = credentials => ({
  type: LOGIN_USER_REQUEST,
  credentials
});

export const logInUserFailure = error => ({
  type: LOGIN_USER_FAILURE,
  error
});

export const fetchCurrentUserRequest = () => ({
  type: FETCH_CURRENT_USER_REQUEST
})

export const fetchCurrentUserSuccess = user => ({
  type: FETCH_CURRENT_USER_SUCCESS,
  user
})

export const fetchCurrentUserFailure = error => ({
  type: FETCH_CURRENT_USER_FAILURE,
  error
})

export const clearUserError = () => ({
  type: CLEAR_USER_ERROR
})