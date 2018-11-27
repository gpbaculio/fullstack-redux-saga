import _ from 'lodash'
import {
  ADD_TODO_BY_USER_SUCCESS,
  FETCH_TODOS_BY_USER_SUCCESS,
  TOGGLE_TODO_COMPLETE_BY_USER_SUCCESS
} from "../types";

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO_BY_USER_SUCCESS:
      return { ...state, [action.todoWithUserData._id]: { ...action.todoWithUserData } }
    case FETCH_TODOS_BY_USER_SUCCESS:
      return {
        ...state, ..._.keyBy(action.todos, (todo) => todo._id)
      }
    case TOGGLE_TODO_COMPLETE_BY_USER_SUCCESS:
      return { ...state, [action.todo.id]: { ...action.todo } }
    default:
      return state
  }
}
