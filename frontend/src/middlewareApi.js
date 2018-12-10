import { BEGIN, COMMIT, REVERT } from 'redux-optimist';
import axios from 'axios'
import uuidV1 from 'uuid'
import map from 'lodash/map'
import filter from 'lodash/filter'
import values from 'lodash/values'
import keyBy from 'lodash/keyBy'
import unset from 'lodash/unset'
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
  DELETE_TODO_FAILURE,
  DELETE_COMPLETED_REQUEST,
  DELETE_COMPLETED_SUCCESS,
  DELETE_COMPLETED_FAILURE
} from './types'

export default function (store) {
  return next => async action => {
    if (action.type === ADD_TODO_BY_USER_REQUEST) {
      const transactionId = uuidV1();
      const { todoText, userId } = action.todoTextWithUserId
      const { sort } = store.getState().todos
      let { entities, ids, count } = store.getState().todos
      const mockTodo = {
        transactionId, // so we can trace
        complete: false,
        createdAt: new Date().toISOString(),
        _id: uuidV1(),
        text: todoText,
        updatedAt: new Date().toISOString(),
        userId: {
          _id: userId
        },
      }
      if (sort !== 'complete') {
        count += 1
      }
      next({ // data is mock todo
        type: ADD_TODO_BY_USER_SUCCESS,
        entities: { ...entities, [mockTodo._id]: mockTodo },
        ids: [mockTodo._id, ...ids],
        count,
        optimist: { type: BEGIN, id: transactionId }
      });
      try {
        const { data } = await axios.post("/api/todo", { todoText, userId })
        const index = values({ ...entities }).findIndex(todo => todo.transactionId === transactionId)
        entities[index] = data.todo
        entities = keyBy(values({ ...entities }), todo => todo._id)
        ids = [data.todo._id, ...ids].filter(id => id !== transactionId)
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
          error: error.message,
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
          todo: data.todos[0],
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
      const { ids } = store.getState().todos
      let { entities } = store.getState().todos
      const { id: userId } = store.getState().user
      const { complete } = action
      const todos = map(ids, id => entities[id])
      let idsToUpdate;
      if (complete) {
        idsToUpdate = map(filter(todos, todo => !todo.complete), '_id')
      } else {
        idsToUpdate = map(filter(todos, todo => todo.complete), '_id')
      }
      entities = {
        ...entities,
        ...keyBy(
          idsToUpdate
            .map(id => ({
              ...entities[id],
              complete
            })), todo => todo._id),
      }
      next({ // data is mock todo
        type: TOGGLE_ALL_SUCCESS,
        entities,
        optimist: { type: BEGIN, id: transactionId }
      });
      try {
        const { data } = await axios.post('/api/todo/toggle_complete', {
          ids: idsToUpdate,
          userId,
          complete
        })
        next({
          type: TOGGLE_ALL_SUCCESS,
          entities: {
            ...entities,
            ...keyBy(
              data.todos,
              todo => todo._id),
          },
          ids: map(entities, '_id'),
          count: map(entities, '_id').length,
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
    if (action.type === DELETE_COMPLETED_REQUEST) {
      const transactionId = uuidV1()
      let { entities, ids } = store.getState().todos
      const { count } = store.getState().todos
      const { id: userId } = store.getState().user
      const idsToDelete = map(
        filter(map(ids, id => entities[id]),
          todo => todo.complete), '_id')
      entities = {
        ...keyBy(
          map(
            filter(
              ids, i => !idsToDelete.includes(i)
            ), id => entities[id]),
          todo => todo._id
        ),
      }
      ids = filter(ids, i => !idsToDelete.includes(i))
      next({
        type: DELETE_COMPLETED_SUCCESS,
        entities,
        ids,
        count: count - idsToDelete.length,
        optimist: { type: BEGIN, id: transactionId }
      });
      try {
        await axios.post('/api/todo/delete_completed', {
          ids: idsToDelete,
          userId
        })
        next({
          type: DELETE_COMPLETED_SUCCESS,
          entities,
          ids,
          count: count - idsToDelete.length,
          optimist: { type: COMMIT, id: transactionId }
        })
      } catch (error) {
        next({
          type: DELETE_COMPLETED_FAILURE,
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
        const { data } = await axios.post('/api/todo/update_text', {
          id,
          userId,
          text
        })
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
      const { entities } = store.getState().todos
      unset(entities, id); // remove property id
      let { count } = store.getState().todos
      const { id: userId } = store.getState().user
      count -= 1
      next({
        type: DELETE_TODO_SUCCESS,
        entities,
        ids: Object.keys(entities),
        count,
        optimist: { type: BEGIN, id: transactionId }
      });
      try {
        await axios.post('/api/todo/delete', { id, userId })
        next({
          type: DELETE_TODO_SUCCESS,
          entities,
          ids: Object.keys(entities),
          count,
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