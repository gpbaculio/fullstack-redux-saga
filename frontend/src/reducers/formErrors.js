import {
  CREATE_USER_FAILURE,
  CREATE_USER_REQUEST,
  RESET_FORM_STATE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  USER_LOGGED_IN
} from "../types";

const initialState = {
  loading: false,
  signUp: {},
  logIn: {}
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
      return { ...state, loading: false }
    case RESET_FORM_STATE:
      return { ...state, ...action.form }
    default:
      return state
  }
}
