import { combineReducers } from 'redux';

import user from './user'
import formErrors from './formErrors'
import todos from './todos'

export default combineReducers({ user, formErrors, todos })