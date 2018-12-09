import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducer from './reducer';
import Todo from './routes/Todo/Todo';
import Login from './routes/Login';
import Register from './routes/Register';
import './index.css';

const middleware = [logger, thunk];
// const middleware = [thunk].concat(process.env.NODE_ENV === `development`?logger:[]);
const store = createStore(reducer, compose(
  applyMiddleware(...middleware),
  composeWithDevTools()
))
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/todo" component={Todo}/>
        <Route path="/" component={Register}/>
        <Route path="/login" component={Login}/>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
