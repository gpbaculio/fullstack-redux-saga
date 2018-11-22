import { ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_FAILURE } from "../types";

export const addTodoRequest = todoTextWithUserId => ({
  type: ADD_TODO_REQUEST,
  todoTextWithUserId
})

export const addTodoSuccess = todoWithUserData => ({
  type: ADD_TODO_SUCCESS,
  todoWithUserData
})

export const addTodoFailure = errors => ({
  type: ADD_TODO_FAILURE,
  errors
})