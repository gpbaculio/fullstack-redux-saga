import {
  USER_LOGGED_IN,
  FETCH_CURRENT_USER_SUCCESS,
  USER_LOGGED_OUT,
  USER_CONFIRM_TOKEN_SUCCESS
} from "../types";

const initialState = {}

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...action.user };
    case FETCH_CURRENT_USER_SUCCESS:
      return { ...state, ...action.user }
    case USER_LOGGED_OUT:
      return { ...initialState }
    case USER_CONFIRM_TOKEN_SUCCESS:
      return { ...state, confirmed: true, email: action.email }
    default:
      return state;
  }
}
