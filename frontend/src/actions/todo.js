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
  TOGGLE_ALL_REQUEST,
  EDIT_TODO_TEXT_REQUEST,
  DELETE_TODO_REQUEST,
  SET_PAGE,
  SET_SORT,
  DELETE_COMPLETED_REQUEST,
  SHOW_REFRESH,
  SET_SEARCH_TEXT,
  CLEAR_ERROR,
  CLEAR_SEARCH_TEXT
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

export const fetchTodosByUserRequest = data => ({
  type: FETCH_TODOS_BY_USER_REQUEST,
  data
})

export const fetchTodosByUserSuccess = ({ entities, count, ids }) => ({
  type: FETCH_TODOS_BY_USER_SUCCESS,
  entities,
  count,
  ids
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

export const editTodo = data => ({
  type: EDIT_TODO_TEXT_REQUEST,
  data
})

export const deleteTodo = id => ({
  type: DELETE_TODO_REQUEST,
  id
})

export const showRefresh = () => ({
  type: SHOW_REFRESH,
})

export const setPage = page => ({
  type: SET_PAGE,
  page
})

export const setSort = sort => ({
  type: SET_SORT,
  sort
})

export const deleteCompleted = () => ({
  type: DELETE_COMPLETED_REQUEST,
})

export const setSearchText = text => ({
  type: SET_SEARCH_TEXT,
  text
})

export const clearError = () => ({
  type: CLEAR_ERROR
})

export const clearSearchText = () => ({
  type: CLEAR_SEARCH_TEXT
})