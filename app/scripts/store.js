import _ from 'underscore';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import ruleManager from './rule-manager';

const focusEditor = (/* { getState } */) => next => action => {
  if (_.contains(['ADD_RULE', 'EDIT_RULE'], action.type)) {
    window.setTimeout(() => {
      window.location.href = '#editor';
    }, 0);
  }
  return next(action);
};

const serverSync = ({ getState }) => next => action => {
  if (_.contains(['COMMIT_EDITING', 'REMOVE_EDITING'], action.type)) {
    window.setTimeout(() => {
      ruleManager.sync(getState().rules);
    }, 0);
  }
  return next(action);
};

export default createStore(reducer, {
  rules: [],
}, applyMiddleware(focusEditor, serverSync));
