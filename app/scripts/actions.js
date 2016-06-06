export function editRule(id) {
  return {
    type: 'EDIT_RULE',
    id,
  };
}

export function addRule() {
  return {
    type: 'ADD_RULE',
  };
}

export function removeRule(id) {
  return {
    type: 'REMOVE_RULE',
    id,
  };
}

export function commitEditing(rule) {
  return {
    type: 'COMMIT_EDITING',
    rule,
  };
}

export function cancelEditing() {
  return {
    type: 'CANCEL_EDITING',
  };
}
