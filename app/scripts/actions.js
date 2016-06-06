import _ from 'underscore';

function simpleAction(type, ...keys) {
  return (...values) => _.extend({ type }, _.object(keys, values));
}

export const addRule = simpleAction('ADD_RULE');
export const editRule = simpleAction('EDIT_RULE', 'id');
export const removeRule = simpleAction('REMOVE_EDITING');
export const commitEditing = simpleAction('COMMIT_EDITING');
export const cancelEditing = simpleAction('CANCEL_EDITING');
export const loadRules = simpleAction('LOAD_RULES', 'rules');

function editorChange(key) {
  return value => ({
    type: 'EDITOR_CHANGE',
    key,
    value,
  });
}

export const changeTitle = editorChange('title');
export const changeDescription = editorChange('description');
export const changeRegex = editorChange('regex');
export const changeUser = editorChange('user');
export const changePen = editorChange('pen');
