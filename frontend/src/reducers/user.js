import {
  USER_LOGGED_IN,
} from "../types";

export default function user(state = { loaded: false }, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...action.user, loaded: true };
    default:
      return state;
  }
}
