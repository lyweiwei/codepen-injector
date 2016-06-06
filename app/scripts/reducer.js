import _ from 'underscore';
import { uuid } from './util';

function addRule(state) {
  return {
    rules: state.rules,
    editing: {
      id: uuid(),
      type: 'codepen',
    },
  };
}

function removeEditing(state, id = state.editing.id) {
  return {
    rules: _.filter(state.rules, rule => rule.id !== id),
  };
}

function cancelEditing(state) {
  if (state.editing) {
    return _.pick(state, 'rules');
  }
  return state;
}

function commitEditing(state) {
  if (state.editing) {
    let editingNewRule = true;
    const rules = _.map(state.rules, rule => {
      if (rule.id === state.editing.id) {
        editingNewRule = false;
        return state.editing;
      }
      return rule;
    });

    if (editingNewRule) {
      rules.push(state.editing);
    }

    return { rules };
  }
  return state;
}

function startEditing(state, id) {
  return _.extend({}, cancelEditing(state), {
    editing: _.find(state.rules, rule => rule.id === id),
  });
}

export default (state, action) => {
  if (action.type === 'EDIT_RULE') {
    return startEditing(state, action.id);
  } else if (action.type === 'COMMIT_EDITING') {
    return commitEditing(state);
  } else if (action.type === 'CANCEL_EDITING') {
    return cancelEditing(state);
  } else if (action.type === 'ADD_RULE') {
    return addRule(state);
  } else if (action.type === 'REMOVE_EDITING') {
    return removeEditing(state);
  } else if (action.type === 'EDITOR_CHANGE') {
    return _.extend({}, state, {
      editing: _.extend({}, state.editing, {
        [action.key]: action.value,
      }),
    });
  }

  return state;
};
