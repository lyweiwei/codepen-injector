import _ from 'underscore';
import React from 'react';
import { connect } from 'react-redux';

import RuleList from './rule-list.jsx';
import {
  addRule,
  commitEditing,
  cancelEditing,
  removeRule,
} from './actions';

const RulesPanel = ({
  rules,
  editing,
  onAddRule,
  onCommit,
  onCancel,
  onRemove,
}) => (
  <div className="panel panel-default" style={ { margin: 0 } }>
    <div className="panel-heading">Codepen Injector</div>
    <div className="panel-body">Here're the injected codepens</div>
    <RuleList rules={rules} editing={editing}/>
    <div className="panel-footer">
      {
        editing ? (
          <div>
            <button type="button" className="btn btn-primary" onClick={ onCommit }>Save</button>
            &nbsp;
            <button type="button" className="btn btn-default" onClick={ onCancel }>Cancel</button>
            &nbsp;
            {
              _.find(rules, rule => rule.id === editing.id) ? (
                <button type="button" className="btn btn-default" onClick={ onRemove }>Remove</button>
              ) : null
            }
          </div>
        ) : (
          <button type="button" className="btn btn-primary" onClick={onAddRule}>New Rule</button>
        )
      }
    </div>
  </div>
);

export default connect(state => _.pick(state, 'rules', 'editing'), dispatch => ({
  onAddRule() {
    dispatch(addRule());
  },
  onCommit() {
    dispatch(commitEditing());
  },
  onCancel() {
    dispatch(cancelEditing());
  },
  onRemove() {
    dispatch(removeRule());
  },
}))(RulesPanel);
