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
    const { todoText, userId } = action.todoTextWithUserId

    next({ // data is mock todo
      type: ADD_TODO_BY_USER_SUCCESS,
      data: {
        transactionId: transactionID,
        complete: false,
        createdAt: new Date().toISOString(),
        _id: uuidV1(),
        text: todoText,
        updatedAt: new Date().toISOString(),
        userId: {
          _id: userId
        },
      },
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