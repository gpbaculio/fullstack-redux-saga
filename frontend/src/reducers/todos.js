import { ADD_TODO_BY_USER_SUCCESS, FETCH_TODOS_BY_USER_REQUEST, FETCH_TODOS_BY_USER_SUCCESS } from "../types";

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {

    case ADD_TODO_BY_USER_SUCCESS:
      return { ...state, [action.todoWithUserData._id]: { ...action.todoWithUserData } }
    case FETCH_TODOS_BY_USER_SUCCESS:
      return { ...state, ...action.todos }
    default:
      return state
  }
}
