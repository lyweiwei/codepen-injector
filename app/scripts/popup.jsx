import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import RulesPanel from './rules-panel.jsx';
import { loadRules } from './actions';
import ruleManager from './rule-manager';

import 'bootstrap-loader';

render(
  <Provider store={store}>
    <RulesPanel />
  </Provider>,
  document.getElementById('container')
);

ruleManager.fetch().then(rules => store.dispatch(loadRules(rules)));
