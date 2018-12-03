import _ from 'lodash'
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
  ADD_TODO_BY_USER_REQUEST
} from "../types";

const initialState = {
  ids: [],
  entities: {},
  count: 0,
  page: 1,
  sort: 'all',
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        page: action.page
      }
    case ADD_TODO_BY_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        entities: action.entities,
        ids: action.ids,
        count: action.count
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
    case FETCH_TODOS_BY_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_TODOS_BY_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        entities: {
          ..._.keyBy(
            action.data.todos,
            (todo) => todo._id)
        },
        ids: _.map(action.data.todos, '_id'),
        count: action.data.count,
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
    case SET_SORT:
      return {
        ...state,
        sort: action.sort
      }
    default:
      return state
  }
}
