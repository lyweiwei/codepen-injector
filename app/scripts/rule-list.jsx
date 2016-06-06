import _ from 'underscore';
import React from 'react';
import EditItem from './edit-item.jsx';
import CodepenRuleItem from './codepen-rule-item.jsx';

export default ({ rules, editing }) => {
  let editingNewRule = Boolean(editing);

  return (
    <div className="list-group" style={ { maxHeight: 420, overflow: 'scroll' }}>
      {
        rules.map(rule => {
          let RuleItem = {
            codepen: CodepenRuleItem,
          }[rule.type];

          if (editing && rule.id === editing.id) {
            editingNewRule = false;
            RuleItem = EditItem;
          }

          return React.createElement(RuleItem, _.extend({ key: rule.id }, rule));
        })
      }
      {
        editingNewRule ? <EditItem key={editing.id} {...editing}></EditItem> : null
      }
    </div>
  );
};
