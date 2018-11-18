import { combineReducers } from 'redux';

import user from './user'
import formErrors from './formErrors'

export default combineReducers({ user, formErrors })