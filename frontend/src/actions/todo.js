import {
  ADD_TODO_BY_USER_REQUEST,
  ADD_TODO_BY_USER_SUCCESS,
  ADD_TODO_BY_USER_FAILURE,
  FETCH_TODOS_BY_USER_REQUEST,
  FETCH_TODOS_BY_USER_SUCCESS,
  FETCH_TODOS_BY_USER_FAILURE,
  TOGGLE_TODO_COMPLETE_BY_USER_SUCCESS,
  TOGGLE_TODO_COMPLETE_BY_USER_FAILURE,
  TOGGLE_TODO_COMPLETE_BY_USER_REQUEST,
  TOGGLE_ALL_FAILURE,
  TOGGLE_ALL_REQUEST
} from "../types";

export const addTodoByUserRequest = todoTextWithUserId => ({
  type: ADD_TODO_BY_USER_REQUEST,
  todoTextWithUserId
})

export const addTodoByUserSuccess = data => ({
  type: ADD_TODO_BY_USER_SUCCESS,
  data
})

export const addTodoByUserFailure = error => ({
  type: ADD_TODO_BY_USER_FAILURE,
  error
})

export const fetchTodosByUserRequest = page => ({
  type: FETCH_TODOS_BY_USER_REQUEST,
  page
})

export const fetchTodosByUserSuccess = data => ({
  type: FETCH_TODOS_BY_USER_SUCCESS,
  data
})

export const fetchTodosByUserFailure = errors => ({
  type: FETCH_TODOS_BY_USER_FAILURE,
  errors
})

export const toggleTodoCompleteByUserRequest = data => ({
  type: TOGGLE_TODO_COMPLETE_BY_USER_REQUEST,
  data
})

export const toggleTodoCompleteByUserSuccess = todo => ({
  type: TOGGLE_TODO_COMPLETE_BY_USER_SUCCESS,
  todo
})

export const toggleTodoCompleteByUserFailure = error => ({
  type: TOGGLE_TODO_COMPLETE_BY_USER_FAILURE,
  error
})

export const toggleAll = complete => ({
  type: TOGGLE_ALL_REQUEST,
  complete
})