import { USER_LOGGED_IN } from '../types'

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});