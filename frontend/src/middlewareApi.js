import { BEGIN, COMMIT, REVERT } from 'redux-optimist';
import axios from 'axios'
import uuidV1 from 'uuid'
import _ from 'lodash'
import {
  ADD_TODO_BY_USER_REQUEST,
  ADD_TODO_BY_USER_SUCCESS,
  ADD_TODO_BY_USER_FAILURE,
  TOGGLE_TODO_COMPLETE_BY_USER_REQUEST,
  TOGGLE_TODO_COMPLETE_BY_USER_SUCCESS,
  TOGGLE_TODO_COMPLETE_BY_USER_FAILURE
} from './types'

export default function (store) {
  return next => async action => {
    if (action.type === ADD_TODO_BY_USER_REQUEST) {
      const transactionId = uuidV1();
      const { todoText, userId } = action.todoTextWithUserId
      next({ // data is mock todo
        type: ADD_TODO_BY_USER_SUCCESS,
        data: {
          transactionId, // so we can trace
          complete: false,
          createdAt: new Date().toISOString(),
          _id: uuidV1(),
          text: todoText,
          updatedAt: new Date().toISOString(),
          userId: {
            _id: userId
          },
        },
        optimist: { type: BEGIN, id: transactionId }
      });
      try {
        const { data } = await axios.post("/api/todo", { todoText, userId })
        let { entities, ids, count } = store.getState().todos
        const entArr = _.values(entities)
        const entIdx = _.values(entities).findIndex(todo => todo.transactionId === transactionId)
        entArr[entIdx] = data.todo
        entities = _.keyBy(entArr, (todo) => todo._id)
        ids = [data.todo._id, ...ids].filter(id => id !== transactionId)
        count += 1
        next({
          type: ADD_TODO_BY_USER_SUCCESS,
          entities,
          ids,
          count,
          optimist: { type: COMMIT, id: transactionId }
        })
      } catch (error) {
        next({
          type: ADD_TODO_BY_USER_FAILURE,
          error,
          optimist: { type: REVERT, id: transactionId }
        })
      }
    }
    if (action.type === TOGGLE_TODO_COMPLETE_BY_USER_REQUEST) {
      const transactionId = uuidV1();
      const { userId, todo } = action.data
      next({ // data is mock todo
        type: TOGGLE_TODO_COMPLETE_BY_USER_SUCCESS,
        todo: {
          ...todo,
          updatedAt: new Date().toISOString(),
          complete: !todo.complete,
        },
        optimist: { type: BEGIN, id: transactionId }
      });
      try {
        const { data } = await axios.post(
          '/api/todo/toggle_complete',
          {
            todoId: todo._id,
            userId,
            complete: todo.complete
          })
        next({
          type: TOGGLE_TODO_COMPLETE_BY_USER_SUCCESS,
          todo: data.todo,
          optimist: { type: COMMIT, id: transactionId }
        })
      } catch (error) {
        next({
          type: TOGGLE_TODO_COMPLETE_BY_USER_FAILURE,
          error,
          optimist: { type: REVERT, id: transactionId }
        })
      }
    }
    return next(action);
  }
};