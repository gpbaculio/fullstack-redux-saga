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
  DELETE_COMPLETED_SUCCESS,
  TOGGLE_ALL_REQUEST,
  SET_SEARCH_TEXT
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
  initializing: false,
  showRefresh: false,
  searchText: '',
  disableField: false
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
        disableField: false,
        countPerPage: state.countPerPage + 1
      }
    case ADD_TODO_BY_USER_SUCCESS:
      return {
        ...state,
        disableField: true,
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
    case TOGGLE_ALL_REQUEST:
      return {
        ...state,
        loading: false,
      }
    case TOGGLE_ALL_SUCCESS:
      return {
        ...state,
        loading: true,
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
        countPerPage: 9,
        initializing: true, // show load upon render on all
      }
    case FETCH_TODOS_BY_USER_SUCCESS:
      return {
        ...state,
        initializing: false,
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
        showRefresh: false,
        sort: action.sort
      }
    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.text
      }
    default:
      return state
  }
}
