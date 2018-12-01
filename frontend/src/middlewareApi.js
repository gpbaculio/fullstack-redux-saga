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
  TOGGLE_TODO_COMPLETE_BY_USER_FAILURE,
  TOGGLE_ALL_REQUEST,
  TOGGLE_ALL_SUCCESS,
  TOGGLE_ALL_FAILURE,
  EDIT_TODO_TEXT_REQUEST,
  EDIT_TODO_TEXT_SUCCESS,
  EDIT_TODO_TEXT_FAILURE,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE
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
        const index = _.values({ ...entities }).findIndex(todo => todo.transactionId === transactionId)
        entities[index] = data.todo
        entities = _.keyBy(_.values({ ...entities }), todo => todo._id)
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
        const { data } = await axios.post('/api/todo/toggle_complete', {
          ids: [todo._id],
          userId,
          complete: !todo.complete
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
    if (action.type === TOGGLE_ALL_REQUEST) {
      const transactionId = uuidV1()
      const { entities, ids } = store.getState().todos
      const { id: userId } = store.getState().user
      const { complete } = action
      const todos = ids.map(id => entities[id])
      let idsToUpdate;
      if (complete) {
        idsToUpdate = _.map(todos.filter(todo => todo.complete !== complete), '_id')
      } else {
        idsToUpdate = _.map(todos.filter(todo => todo.complete === complete), '_id')
      }
      next({ // data is mock todo
        type: TOGGLE_ALL_SUCCESS,
        entities: {
          ...entities,
          ..._.keyBy(
            idsToUpdate
              .map(id => ({
                ...entities[id],
                complete
              })), todo => todo._id)
        },
        optimist: { type: BEGIN, id: transactionId }
      });
      try {
        const { data } = await axios.post('/api/todo/toggle_complete', { ids: idsToUpdate, userId, complete })
        next({
          type: TOGGLE_ALL_SUCCESS,
          entities: {
            ...entities,
            ..._.keyBy(
              data.todos,
              (todo) => todo._id)
          },
          optimist: { type: COMMIT, id: transactionId }
        })
      } catch (error) {
        next({
          type: TOGGLE_ALL_FAILURE,
          error,
          optimist: { type: REVERT, id: transactionId }
        })
      }
    }
    if (action.type === EDIT_TODO_TEXT_REQUEST) {
      const transactionId = uuidV1()
      const { id, text } = action.data
      const { entities } = store.getState().todos
      const { id: userId } = store.getState().user
      next({
        type: EDIT_TODO_TEXT_SUCCESS,
        entities: {
          ...entities,
          [id]: {
            ...entities[id],
            text,
            updatedAt: new Date().toISOString(),
          }
        },
        optimist: { type: BEGIN, id: transactionId }
      });
      try {
        const { data } = await axios.post('/api/todo/update_text', { id, userId, text })
        next({
          type: EDIT_TODO_TEXT_SUCCESS,
          entities: {
            ...entities,
            [id]: data.todo
          },
          optimist: { type: COMMIT, id: transactionId }
        })
      } catch (error) {
        next({
          type: EDIT_TODO_TEXT_FAILURE,
          error,
          optimist: { type: REVERT, id: transactionId }
        })
      }
    }
    if (action.type === DELETE_TODO_REQUEST) {
      const transactionId = uuidV1()
      const { id } = action
      const { entities, ids, count } = store.getState().todos
      const { id: userId } = store.getState().user
      delete entities[id]
      next({
        type: DELETE_TODO_SUCCESS,
        entities,
        ids: ids.filter(todoId => todoId !== id),
        count: count - 1,
        optimist: { type: BEGIN, id: transactionId }
      });
      try {
        const { data } = await axios.post('/api/todo/delete', { id, userId })
        next({
          type: DELETE_TODO_SUCCESS,
          entities: {
            ..._.keyBy(
              data.todos,
              (todo) => todo._id)
          },
          ids: _.map(data.todos, '_id'),
          count: data.count,
          optimist: { type: COMMIT, id: transactionId }
        })
      } catch (error) {
        next({
          type: DELETE_TODO_FAILURE,
          error,
          optimist: { type: REVERT, id: transactionId }
        })
      }
    }
    return next(action);
  }
};