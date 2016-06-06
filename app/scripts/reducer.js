import _ from 'underscore';
import { uuid } from './util';

export default (state, action) => {
  if (action.type === 'EDIT_RULE') {
    return _.extend({}, state, {
      editingRule: action.id,
    });
  } else if (action.type === 'COMMIT_EDITING') {
    return {
      rules: _.map(state.rules, rule => {
        if (rule.id === action.rule.id) {
          return _.defaults({ id: action.id }, action.rule);
        }
        return rule;
      }),
    };
  } else if (action.type === 'CANCEL_EDITING') {
    return _.pick(state, 'rules');
  } else if (action.type === 'ADD_RULE') {
    const id = uuid();
    return {
      rules: state.rules.concat([{
        id,
        type: 'codepen',
      }]),
      editingRule: id,
    };
  } else if (action.type === 'REMOVE_RULE') {
    return {
      rules: _.filter(state.rules, rule => rule.id !== action.id),
    };
  }

  return state;
};
