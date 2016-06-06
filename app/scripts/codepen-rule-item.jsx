import _ from 'underscore';
import React from 'react';
import { connect } from 'react-redux';
import { editRule } from './actions';

const codepenUrl = (user, pen) => `http://codepen.io/${user}/pen/${pen}`;

const CodepenRuleItem = ({
  title,
  description,
  user,
  pen,
  regex,
  onClick,
}) => (
  <button type="button" className="list-group-item" onClick={onClick}>
    <h4 className="list-group-item-heading">
      {title}
      &nbsp;
      <a href={codepenUrl(user, pen)} target="_blank">Edit</a>
    </h4>
    <p className="list-group-item-text">
      <i>RegExp:</i>
      &nbsp;
      {regex}
    </p>
    <p className="list-group-item-text">
      <i>Description:</i>
      &nbsp;
      {description}
    </p>
  </button>
);

const mapStateToProps = _.identity;
const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(editRule(ownProps.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CodepenRuleItem);
