import { TOGGLE_TODO_COMPLETE_BY_USER_REQUEST, TOGGLE_TODO_COMPLETE_BY_USER_SUCCESS, TOGGLE_TODO_COMPLETE_BY_USER_FAILURE } from '../types'

const initialState = {
  loading: false,
  error: '',
}

export default (state = initialState, action) => {
  switch (action.type) {

    case TOGGLE_TODO_COMPLETE_BY_USER_REQUEST:
      return { ...state, loading: true, error: '' }

    case TOGGLE_TODO_COMPLETE_BY_USER_SUCCESS:
      return { ...state, loading: false, error: '' }

    case TOGGLE_TODO_COMPLETE_BY_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
