import _ from 'underscore';
import React from 'react';
import EditItem from './edit-item.jsx';
import CodepenRuleItem from './codepen-rule-item.jsx';

export default ({ rules, editing: { id } = {} }) => (
  <div className="list-group">
    {
      rules.map(rule => {
        const RuleItem = rule.id === id ? EditItem : {
          codepen: CodepenRuleItem,
        }[rule.type];

        return React.createElement(RuleItem, _.extend({ key: rule.id }, rule));
      })
    }
  </div>
);
