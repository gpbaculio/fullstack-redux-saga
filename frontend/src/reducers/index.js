import { combineReducers } from 'redux';
import optimist from 'redux-optimist'

import { todosPaginatorReducers, todosStoreName } from '../todosPaginationConfig';
import user from './user'
import formErrors from './formErrors'
import todos from './todos'
import updateTodo from './updateTodo'

export default optimist(combineReducers({
  user,
  formErrors,
  todos,
  updateTodo,
  [todosStoreName]: todosPaginatorReducers,
}))