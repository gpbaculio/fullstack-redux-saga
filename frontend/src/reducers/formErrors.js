import {
  CREATE_USER_FAILURE,
  CREATE_USER_REQUEST,
  RESET_FORM_STATE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  USER_LOGGED_IN,
  USER_CONFIRM_TOKEN_REQUEST,
  USER_CONFIRM_TOKEN_FAILURE,
  USER_CONFIRM_TOKEN_SUCCESS
} from "../types";

const initialState = {
  loading: false,
  signUp: {},
  logIn: {},
  confirmToken: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return { ...state, loading: true, signUp: {} } // clear errors
    case CREATE_USER_FAILURE:
      return { ...state, loading: false, signUp: action.errors }
    case LOGIN_USER_REQUEST:
      return { ...state, loading: true, logIn: {} }
    case LOGIN_USER_FAILURE:
      return { ...state, loading: false, logIn: action.errors }
    case USER_LOGGED_IN:
      return { ...initialState, loading: false }
    case RESET_FORM_STATE:
      return { ...initialState, ...action.form }
    case USER_CONFIRM_TOKEN_REQUEST:
      return { ...state, loading: true, confirmToken: {} }
    case USER_CONFIRM_TOKEN_SUCCESS:
      return { ...state, loading: false, confirmToken: {} }
    case USER_CONFIRM_TOKEN_FAILURE:
      return { ...state, loading: false, confirmToken: action.errors }
    default:
      return state
  }
}
