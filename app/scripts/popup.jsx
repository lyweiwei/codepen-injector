import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducer';
import RulesPanel from './rules-panel.jsx';
import { uuid } from './util';

import 'bootstrap-loader';

const id = uuid();

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
  // editing: {
  //   id,
  // },
});

render(
  <Provider store={store}>
    <RulesPanel />
  </Provider>,
  document.getElementById('container')
);
