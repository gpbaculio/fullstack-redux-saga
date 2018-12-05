import {
  ADD_TODO_BY_USER_SUCCESS,
  FETCH_TODOS_BY_USER_SUCCESS,
  TOGGLE_TODO_COMPLETE_BY_USER_SUCCESS,
  TOGGLE_ALL_SUCCESS,
  EDIT_TODO_TEXT_SUCCESS,
  DELETE_TODO_SUCCESS,
  SET_PAGE,
  SET_SORT,
  FETCH_TODOS_BY_USER_REQUEST,
  ADD_TODO_BY_USER_REQUEST,
  USER_LOGGED_OUT,
  SHOW_REFRESH,
  DELETE_COMPLETED_SUCCESS
} from "../types";

const initialState = {
  ids: [],
  entities: {},
  count: 0,
  page: 1,
  sort: 'all',
  loading: false,
  refetching: false,
  countPerPage: 9,
  showRefresh: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_OUT:
      return {
        ...initialState
      }
    case SET_PAGE:
      return {
        ...state,
        page: action.page
      }
    case ADD_TODO_BY_USER_REQUEST:
      return {
        ...state,
        countPerPage: state.countPerPage + 1
      }
    case ADD_TODO_BY_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        entities: action.entities,
        ids: action.ids,
        count: action.count,
      }
    case TOGGLE_TODO_COMPLETE_BY_USER_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.todo._id]: action.todo
        },
      }
    case TOGGLE_ALL_SUCCESS:
      return {
        ...state,
        entities: action.entities,
      }
    case SHOW_REFRESH:
      return {
        ...state,
        showRefresh: true,
      }
    case FETCH_TODOS_BY_USER_REQUEST:
      return {
        ...state,
        loading: true,
        countPerPage: 9
      }
    case FETCH_TODOS_BY_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        entities: action.entities,
        showRefresh: false,
        ids: action.ids,
        count: action.count,
      }
    case EDIT_TODO_TEXT_SUCCESS:
      return {
        ...state,
        entities: action.entities
      }
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        entities: action.entities,
        count: action.count,
        ids: action.ids
      }
    case DELETE_COMPLETED_SUCCESS:
      return {
        ...state,
        entities: action.entities,
        count: action.count,
        ids: action.ids
      }
    case SET_SORT:
      return {
        ...state,
        sort: action.sort
      }
    default:
      return state
  }
}
