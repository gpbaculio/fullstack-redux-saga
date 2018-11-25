import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorker from './serviceWorker';
import sagas from './sagas'
import history from "./history";
import axios from 'axios'
import reducers from './reducers'
import { fetchCurrentUserRequest, fetchCurrentUserSuccess } from './actions/user';
import setAuthorizedHeader from './utils/setAuthorizedHeader'

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware, reduxThunk))
);

sagaMiddleware.run(sagas)

const token = localStorage.getItem('gpbTodosJWT')
if (token && !`${window.location.href}`.includes('/confirmation')) {
  setAuthorizedHeader(token)
  const fetched = fetchCurrentUserRequest()
  store.dispatch(fetched)
} else {
  store.dispatch(fetchCurrentUserSuccess({}))
}
ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
