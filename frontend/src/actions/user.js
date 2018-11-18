import { CREATE_USER_REQUEST, CREATE_USER_FAILURE, RESET_FORM_STATE } from '../types'

export const createUserRequest = user => ({
  type: CREATE_USER_REQUEST,
  user
})

export const createUserFailure = errors => ({
  type: CREATE_USER_FAILURE,
  errors
})

export const resetFormState = () => ({ type: RESET_FORM_STATE })