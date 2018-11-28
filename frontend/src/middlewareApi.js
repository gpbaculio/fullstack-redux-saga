import { BEGIN, COMMIT, REVERT } from 'redux-optimist';
import axios from 'axios'
import uuidV1 from 'uuid'
import { ADD_TODO_BY_USER_REQUEST, ADD_TODO_BY_USER_SUCCESS, ADD_TODO_BY_USER_FAILURE } from './types'

export default function () {
  return next => async action => {
    if (action.type !== ADD_TODO_BY_USER_REQUEST) { // WATCH FOR ADD TODO REQUEST
      return next(action);
    }

    const transactionID = uuidV1();
    // ({ todoText, userId }) => axios.post("/api/todo", { todoText, userId }),
    // case ADD_TODO_BY_USER_SUCCESS:
    //   return { ...state, [action.todoWithUserData._id]: { ...action.todoWithUserData } }
    const { todoText, userId } = action.todoTextWithUserId

    const randdId = uuidV1()
    const optimisticTodo = { // expected todo fields on response
      id: randdId,
      complete: false,
      createdAt: new Date().toDateString(),
      _id: randdId,
      text: todoText,
      updatedAt: new Date().toDateString(),
      userId: {
        _id: userId
      },
    }

    next({ // PERFORM 'AS IS' SUCCESS MUTATION HERE
      type: ADD_TODO_BY_USER_SUCCESS,
      data: optimisticTodo,
      optimist: { type: BEGIN, id: transactionID }
    });
    try {
      const { data } = await axios.post("/api/todo", { todoText, userId })
      next({
        type: ADD_TODO_BY_USER_SUCCESS,
        data: { ...data.todo },
        optimist: { type: COMMIT, id: transactionID }
      })
    } catch (error) {
      next({
        type: ADD_TODO_BY_USER_FAILURE,
        error,
        optimist: { type: REVERT, id: transactionID }
      })
    }
  }
};