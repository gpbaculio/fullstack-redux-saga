import { CREATE_USER_FAILURE, CREATE_USER_REQUEST, RESET_FORM_STATE } from "../types";

const initialState = {
  loaded: false,
  signUp: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return { ...state, loaded: true, signup: {} } // clear errors
    case CREATE_USER_FAILURE:
      return { ...state, loaded: false, signUp: action.errors }
    case RESET_FORM_STATE:
      return { ...initialState }
    default:
      return state
  }
}
