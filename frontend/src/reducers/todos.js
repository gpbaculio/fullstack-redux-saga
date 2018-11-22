import { ADD_TODO_SUCCESS } from "../types";

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {

    case ADD_TODO_SUCCESS:
      return { ...state, [action.todoWithUserData._id]: { ...action.todoWithUserData } }

    default:
      return state
  }
}
