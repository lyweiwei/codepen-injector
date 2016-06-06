import _ from 'underscore';
import React from 'react';
import { connect } from 'react-redux';
import EditItem from './edit-item.jsx';
import CodepenRuleItem from './codepen-rule-item.jsx';

const mapStateToProps = state => _.pick(state, 'rules', 'editingRule');

const RuleList = ({ rules, editingRule }) => (
  <div className="list-group">
    {
      rules.map(rule => {
        const RuleItem = rule.id === editingRule ? EditItem : {
          codepen: CodepenRuleItem,
        }[rule.type];

        return React.createElement(RuleItem, _.extend({ key: rule.id }, rule));
      })
    }
  </div>
);

export default connect(mapStateToProps)(RuleList);
