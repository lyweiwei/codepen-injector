import _ from 'underscore';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducer';
import RulesPanel from './rules-panel.jsx';
import { uuid } from './util';

import 'bootstrap-loader';

const id = uuid();

const focusEditor = (/* { getState } */) => next => action => {
  if (_.contains(['ADD_RULE', 'EDIT_RULE'], action.type)) {
    window.setTimeout(() => {
      window.location.href = '#editor';
    }, 0);
  }
  return next(action);
};

const store = createStore(reducer, {
  rules: [{
    id,
    type: 'codepen',
    title: 'Demo',
    description: 'A demo pen',
    user: 'wewei',
    pen: 'ezmXVX',
    regex: '.*',
  }],
}, applyMiddleware(focusEditor));

render(
  <Provider store={store}>
    <RulesPanel />
  </Provider>,
  document.getElementById('container')
);

store.subscribe((...args) => console.log(args));
