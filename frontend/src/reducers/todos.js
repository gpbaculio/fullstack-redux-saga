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
      let entities = { [action.optimist.id]: { ...action.data }, ...state.entities }
      let ids = [action.optimist.id, ...state.ids]
      if (action.optimist.type === 'COMMIT') {
        const arr = _.values(state.entities)
        const idx = _.values(state.entities).findIndex(({ transactionId }) => transactionId === action.optimist.id)

        arr[idx] = action.data
        entities = _.keyBy(arr, (todo) => todo._id)
        ids[ids.indexOf(action.optimist.id)] = action.data._id
        ids = ids.filter(id => id !== action.optimist.id)
      }
      return {
        ...state,
        entities,
        ids,
        count: state.count + 1
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
