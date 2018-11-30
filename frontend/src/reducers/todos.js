import _ from 'lodash'
import {
  ADD_TODO_BY_USER_SUCCESS,
  FETCH_TODOS_BY_USER_SUCCESS,
  TOGGLE_TODO_COMPLETE_BY_USER_SUCCESS,
  TOGGLE_ALL_SUCCESS
} from "../types";

const initialState = {
  ids: [],
  entities: {},
  count: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO_BY_USER_SUCCESS:
      if (action.optimist.type === 'COMMIT') {
        return {
          ...state,
          entities: action.entities,
          ids: action.ids,
          count: action.count
        }
      }
      return {
        ...state,
        entities: {
          [action.optimist.id]: { ...action.data },
          ...state.entities
        },
        ids: [
          action.optimist.id,
          ...state.ids
        ],
        count: state.count + 1
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
      console.log('action', action)
      return {
        ...state,
        entities: action.entities,
      }
    case FETCH_TODOS_BY_USER_SUCCESS:
      return {
        ...state,
        entities: {
          ..._.keyBy(
            action.data.todos,
            (todo) => todo._id)
        },
        ids: _.map(action.data.todos, '_id'),
        count: action.data.count,
      }
    default:
      return state
  }
}
