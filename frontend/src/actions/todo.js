import { ADD_TODO_BY_USER_REQUEST, ADD_TODO_BY_USER_SUCCESS, ADD_TODO_BY_USER_FAILURE, FETCH_TODOS_BY_USER_REQUEST, FETCH_TODOS_BY_USER_SUCCESS, FETCH_TODOS_BY_USER_FAILURE, TOGGLE_TODO_COMPLETE_BY_USER_SUCCESS, TOGGLE_TODO_COMPLETE_BY_USER_FAILURE, TOGGLE_TODO_COMPLETE_BY_USER_REQUEST } from "../types";

export const addTodoByUserRequest = todoTextWithUserId => ({
  type: ADD_TODO_BY_USER_REQUEST,
  todoTextWithUserId
})

export const addTodoByUserSuccess = todoWithUserData => ({
  type: ADD_TODO_BY_USER_SUCCESS,
  todoWithUserData
})

export const addTodoByUserFailure = errors => ({
  type: ADD_TODO_BY_USER_FAILURE,
  errors
})

export const fetchTodosByUserRequest = () => ({
  type: FETCH_TODOS_BY_USER_REQUEST,
})

export const fetchTodosByUserSuccess = todos => ({
  type: FETCH_TODOS_BY_USER_SUCCESS,
  todos
})

export const fetchTodosByUserFailure = errors => ({
  type: FETCH_TODOS_BY_USER_FAILURE,
  errors
})

export const toggleTodoCompleteByUserRequest = todoData => ({
  type: TOGGLE_TODO_COMPLETE_BY_USER_REQUEST,
  todoData
})

export const toggleTodoCompleteByUserSuccess = todo => ({
  type: TOGGLE_TODO_COMPLETE_BY_USER_SUCCESS,
  todo
})

export const toggleTodoCompleteByUserFailure = error => ({
  type: TOGGLE_TODO_COMPLETE_BY_USER_FAILURE,
  error
})