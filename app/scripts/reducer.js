import _ from 'underscore';
import { uuid } from './util';

function removeRule(state, id = state.editing.id) {
  return {
    rules: _.filter(state.rules, rule => rule.id !== id),
  };
}

function cancelEditing(state) {
  if (state.editing) {
    if (state.editing.isNew) {
      return removeRule(state);
    }
    return _.pick(state, 'rules');
  }
  return state;
}

function startEditing(state, id) {
  return _.extend({}, cancelEditing(state), {
    editing: { id },
  });
}

export default (state, action) => {
  if (action.type === 'EDIT_RULE') {
    return startEditing(state, action.id);
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
    return cancelEditing(state);
  } else if (action.type === 'ADD_RULE') {
    const id = uuid();
    return {
      rules: state.rules.concat([{
        id,
        type: 'codepen',
      }]),
      editing: {
        id,
        isNew: true,
      },
    };
  } else if (action.type === 'REMOVE_RULE') {
    return removeRule(state);
  }

  return state;
};
