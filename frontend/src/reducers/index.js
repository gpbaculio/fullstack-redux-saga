import { combineReducers } from 'redux';
import optimist from 'redux-optimist'

import user from './user'
import formErrors from './formErrors'
import todos from './todos'

export default optimist(combineReducers({
  user,
  formErrors,
  todos,
}))