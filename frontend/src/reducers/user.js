import {
  USER_LOGGED_IN,
  FETCH_CURRENT_USER_SUCCESS,
  USER_LOGGED_OUT,
  USER_CONFIRM_TOKEN_SUCCESS,
  FETCH_CURRENT_USER_REQUEST,
  FETCH_TODOS_BY_USER_FAILURE,
  CLEAR_USER_ERROR,
  FETCH_CURRENT_USER_FAILURE
} from "../types";

const initialState = {
  id: '',
  email: '',
  token: '',
  confirmed: false,
  loading: false,
  error: ''
}

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_CURRENT_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_TODOS_BY_USER_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case USER_LOGGED_IN:
      return {
        ...state,
        ...action.user,
        loading: false
      };
    case FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        ...action.user,
        loading: false
      }
    case USER_LOGGED_OUT:
      return { ...initialState }
    case USER_CONFIRM_TOKEN_SUCCESS:
      return {
        ...state,
        confirmed: true,
        email: action.email
      }
    case CLEAR_USER_ERROR:
      return {
        ...state,
        error: ''
      }
    case FETCH_CURRENT_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
}
