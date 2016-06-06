import _ from 'underscore';
import React from 'react';
import { connect } from 'react-redux';

import RuleList from './rule-list.jsx';
import { addRule } from './actions';

const RulesPanel = ({
  rules,
  editing,
  onAddRule,
}) => (
  <div className="panel panel-default" style={ { margin: 0 } }>
    <div className="panel-heading">Codepen Injector</div>
    <div className="panel-body">Here're the injected codepens</div>
    <RuleList rules={rules} editing={editing}/>
    <div className="panel-footer">
      <button type="button" className="btn btn-primary" onClick={onAddRule}>New Rule</button>
    </div>
  </div>
);

export default connect(state => _.pick(state, 'rules', 'editing'), dispatch => ({
  onAddRule() {
    dispatch(addRule());
  },
}))(RulesPanel);
