/**
 * @jsx React.DOM
 */

var React = require('react');
var Panel = require('react-bootstrap/Panel');
var Input = require('react-bootstrap/Input');
var TaskHeader = require('./TaskHeader.react');

module.exports = React.createClass({
    render: function() {
        var header = <TaskHeader task={this.props.task}/>;
        return (
                <Panel header={header}>
                <div className="row">
                  <div className="col-md-2"><h4>Description</h4></div>
                  <div className="col-md-10"><pre>{this.props.task.body.description}</pre></div>
                </div>
                <div className="row">
                  <div className="col-md-2"><h4>Instructions</h4></div>
                  <div className="col-md-10"><pre>{this.props.task.body.instructions}</pre></div>
                </div>
                </Panel>
        );
    }
});
