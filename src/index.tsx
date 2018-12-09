import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger';
import reducer from './reducer';
import Todo from './routes/Todo/Todo';
import './index.css';

const middleware = [logger, thunk];
// const middleware = [thunk].concat(process.env.NODE_ENV === `development`?logger:[]);
const store = createStore(reducer, compose(
  applyMiddleware(...middleware),
  composeWithDevTools()
))
ReactDOM.render(
  <Provider store={store}>
    <Todo />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
