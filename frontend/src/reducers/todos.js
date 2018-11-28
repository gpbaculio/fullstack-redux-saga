import _ from 'lodash'
import {
  ADD_TODO_BY_USER_SUCCESS,
  FETCH_TODOS_BY_USER_SUCCESS,
  TOGGLE_TODO_COMPLETE_BY_USER_SUCCESS
} from "../types";

const initialState = {
  ids: [],
  entities: {},
  count: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO_BY_USER_SUCCESS:
      console.log('action add success', action)
      return {
        ...state,
        entities: { [action.data.userId._id]: { ...action.data }, ...state.entities },
        ids: [action.data._id, ...state.ids],
        count: state.count
      }
    case FETCH_TODOS_BY_USER_SUCCESS:
      return {
        ...state,
        entities: { ..._.keyBy(action.data.todos, (todo) => todo._id) },
        ids: _.map(action.data.todos, '_id'),
        count: action.data.count
      }
    case TOGGLE_TODO_COMPLETE_BY_USER_SUCCESS:
      return { ...state, [action.todo.id]: { ...action.todo } }
    default:
      return state
  }
}
