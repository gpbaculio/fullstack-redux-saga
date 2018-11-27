import { BEGIN, COMMIT, REVERT } from 'redux-optimist';
import request from 'then-request';
import uuidV1 from 'uuid'

export default function () {
  return next => action => {
    if (action.type !== 'ADD_TODO') {
      return next(action);
    }
    const transactionID = uuidV1();
    next({
      type: 'ADD_TODO',
      text: action.text,
      optimist: { type: BEGIN, id: transactionID }
    });
    request('POST', '/add_todo', { text: action.text }).getBody().done(
      res => next({
        type: 'ADD_TODO_COMPLETE',
        text: action.text,
        response: res,
        optimist: { type: COMMIT, id: transactionID }
      }),
      err => next({
        type: 'ADD_TODO_FAILED',
        text: action.text,
        error: err,
        optimist: { type: REVERT, id: transactionID }
      })
    );
  }
};