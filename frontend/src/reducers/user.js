import {
  USER_LOGGED_IN,
  FETCH_CURRENT_USER_SUCCESS,
  USER_LOGGED_OUT,
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
    default:
      return state;
  }
}
