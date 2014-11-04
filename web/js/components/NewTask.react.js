/**
 * @jsx React.DOM
 */

var React = require('react');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var Input = require('react-bootstrap/Input');
var Panel = require('react-bootstrap/Panel');
var TaskActions = require('../actions/TaskActions');
var ApplicationActions = require('../actions/ApplicationActions');

module.exports = React.createClass({
    mixins: [LinkedStateMixin],

    getInitialState: function() {
        return {
            title: '',
            description: '',
            instructions: ''
        };
    },

    onSubmit: function(ev) {
        TaskActions.create_task({
            kind: 'simple',
            title: this.state.title,
            description: this.state.description,
            instructions: this.state.instructions
        });
        this.setState(this.getInitialState());
        ApplicationActions.set_page('tasks');
        ev.preventDefault();
    },

    render: function() {
        return (
                <Panel header="New Task">
                <form className="form-horizontal" onSubmit={this.onSubmit}>
                <Input type="text" valueLink={this.linkState('title')} label="Text" labelClassName="col-md-2" wrapperClassName="col-md-10" />
                <Input type="textarea" valueLink={this.linkState('description')} label="Description" labelClassName="col-md-2" wrapperClassName="col-md-10" />
                <Input type="textarea" valueLink={this.linkState('instructions')} label="Instructions" labelClassName="col-md-2" wrapperClassName="col-md-10" />
                <div className="col-md-offset-11 col-md-1">
                <button type="submit" className="btn btn-primary">Create</button>
                </div>
                </form>
                </Panel>
        );
    }
});
