import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap-loader';

const config = [
  {
    title: 'Demo Pen',
    description: '',
    pen: 'ezmXVX',
    regex: '.*',
  },
];

class ConfigListItem extends React.Component {
  constructor() {
    super();
    this.state = { editing: false };
  }

  onClick(event) {
    if (event.target.tagName !== 'A') {
      this.setState({ editing: !this.state.editing });
    }
  }

  render() {
    const { title, description, pen, regex } = this.props.item;
    const codepenUrl = `http://codepen.io/wewei/pen/${pen}`;
    return this.state.editing ? (
      <div className="list-group-item">
        <form className="form">
          <div className="form-group">
            <label className="control-label">Title:</label>
            <input type="text" className="form-control" defaultValue={title}></input>
          </div>
          <div className="form-group">
            <label className="control-label">RegExp:</label>
            <input type="text" className="form-control" defaultValue={regex}></input>
          </div>
          <div className="form-group">
            <label className="control-label">Codepen:</label>
            <input type="text" className="form-control" defaultValue={pen}></input>
          </div>
          <div className="form-group">
            <label className="control-label">Description:</label>
            <textarea className="form-control" defaultValue={description}></textarea>
          </div>
          <div className="form-group">
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-primary" onClick={this.onClick.bind(this)}>Commit</button>
              <button type="button" className="btn btn-sm btn-default" onClick={this.onClick.bind(this)}>Cancel</button>
              <button type="button" className="btn btn-sm btn-default" onClick={this.onClick.bind(this)}>Remove</button>
            </div>
          </div>
        </form>
      </div>
    ) : (
      <button type="button" className="list-group-item" onClick={this.onClick.bind(this)}>
        <h4 className="list-group-item-heading">
          {title}
          &nbsp;
          (<a href={codepenUrl} target="_blank">Edit</a>)
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
  }
}

class ConfigList extends React.Component {
  render() {
    return (
      <div className="list-group">
        {
          this.props.config.map(
            (item, index) => <ConfigListItem key={index} item={item}/>
          )
        }
      </div>
    );
  }
}

class ConfigPanel extends React.Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Codepen Injector</div>
        <div className="panel-body">Here're the injected codepens</div>
        <ConfigList config={this.props.config}/>
      </div>
    );
  }
}

ReactDOM.render(
  <ConfigPanel config={config}/>,
  document.getElementById('container')
);
