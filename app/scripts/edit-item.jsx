import _ from 'underscore';
import React from 'react';
import { connect } from 'react-redux';
import {
  changeTitle,
  changeDescription,
  changeUser,
  changePen,
  changeRegex,
} from './actions';

const EditItem = ({
  title,
  description,
  regex,
  pen,
  user,
  onChangeTitle,
  onChangeRegex,
  onChangeUser,
  onChangePen,
  onChangeDescription,
}) => (
  <div className="list-group-item" id="editor">
    <form className="form">
      <div className="form-group">
        <label className="control-label">Title:</label>
        <input type="text" className="form-control" defaultValue={title} onChange={
          onChangeTitle
        }></input>
      </div>
      <div className="form-group">
        <label className="control-label">RegExp:</label>
        <input type="text" className="form-control" defaultValue={regex} onChange={
          onChangeRegex
        }></input>
      </div>
      <div className="form-group">
        <label className="control-label">User:</label>
        <input type="text" className="form-control" defaultValue={user} onChange={
          onChangeUser
        }></input>
      </div>
      <div className="form-group">
        <label className="control-label">Codepen:</label>
        <input type="text" className="form-control" defaultValue={pen} onChange={
          onChangePen
        }></input>
      </div>
      <div className="form-group">
        <label className="control-label">Description:</label>
        <textarea className="form-control" defaultValue={description} onChange={
          onChangeDescription
        }></textarea>
      </div>
    </form>
  </div>
);

const mapStateToProps = _.identity;
const mapDispatchToProps = dispatch => _.mapObject({
  onChangeTitle: changeTitle,
  onChangeDescription: changeDescription,
  onChangeRegex: changeRegex,
  onChangeUser: changeUser,
  onChangePen: changePen,
}, action => (e => dispatch(action(e.target.value))));

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
