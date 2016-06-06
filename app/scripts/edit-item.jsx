import _ from 'underscore';
import React from 'react';
import { connect } from 'react-redux';
import { commitEditing, cancelEditing, removeRule } from './actions';

const EditItem = ({
  title,
  description,
  regex,
  pen,
  user,
  onCommit,
  onCancel,
  onRemove,
}) => {
  const inputs = { };

  return (
    <div className="list-group-item">
      <form className="form">
        <div className="form-group">
          <label className="control-label">Title:</label>
          <input type="text" className="form-control" defaultValue={title} ref={
            input => _.extend(inputs, { title: input })
          }>
          </input>
        </div>
        <div className="form-group">
          <label className="control-label">RegExp:</label>
          <input type="text" className="form-control" defaultValue={regex} ref={
            input => _.extend(inputs, { regex: input })
          }></input>
        </div>
        <div className="form-group">
          <label className="control-label">User:</label>
          <input type="text" className="form-control" defaultValue={user} ref={
            input => _.extend(inputs, { user: input })
          }></input>
        </div>
        <div className="form-group">
          <label className="control-label">Codepen:</label>
          <input type="text" className="form-control" defaultValue={pen} ref={
            input => _.extend(inputs, { pen: input })
          }></input>
        </div>
        <div className="form-group">
          <label className="control-label">Description:</label>
          <textarea className="form-control" defaultValue={description} ref={
            input => _.extend(inputs, { description: input })
          }></textarea>
        </div>
        <div className="form-group">
          <div className="btn-group">
            <button type="button" className="btn btn-sm btn-primary" onClick={
              () => onCommit(_.mapObject(inputs, _.property('value')))
            }>Commit</button>
            <button type="button" className="btn btn-sm btn-default" onClick={
              onCancel
            }>Cancel</button>
            <button type="button" className="btn btn-sm btn-default" onClick={
              onRemove
            }>Remove</button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = _.identity;
const mapDispatchToProps = (dispatch, ownProps) => ({
  onCommit(rule) {
    dispatch(commitEditing(_.defaults(rule, ownProps)));
  },
  onCancel() {
    dispatch(cancelEditing());
  },
  onRemove() {
    dispatch(removeRule(ownProps.id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
