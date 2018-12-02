import {
  USER_LOGGED_IN,
  FETCH_CURRENT_USER_SUCCESS,
  USER_LOGGED_OUT,
  USER_CONFIRM_TOKEN_SUCCESS,
  FETCH_CURRENT_USER_REQUEST
} from "../types";

const initialState = {
  id: '',
  email: '',
  token: '',
  confirmed: false,
  loading: false
}

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_CURRENT_USER_REQUEST:
      return { ...state, loading: true }
    case USER_LOGGED_IN:
      return { ...state, ...action.user, loading: false };
    case FETCH_CURRENT_USER_SUCCESS:
      return { ...state, ...action.user, loading: false }
    case USER_LOGGED_OUT:
      return { ...initialState }
    case USER_CONFIRM_TOKEN_SUCCESS:
      return { ...state, confirmed: true, email: action.email }
    default:
      return state;
  }
}
