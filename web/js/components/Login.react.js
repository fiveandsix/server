/**
 * @jsx React.DOM
 */

var React = require('react');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');

var Input = require('react-bootstrap/Input');
var Label = require('react-bootstrap/Label');
var Button = require('react-bootstrap/Button');

var ApplicationActions = require('../actions/ApplicationActions');

module.exports = React.createClass({
    mixins: [LinkedStateMixin],

    getInitialState: function() {
        return {
            username: '',
            password: ''
        };
    },

    onSubmit: function(ev) {
        console.log('log me in', this.state);
        ApplicationActions.login(this.state.username, this.state.password);
        ev.preventDefault();
    },

    render: function() {
        return (
            <div className="container">
              <h1 className="col-sm-offset-2">Please Sign in</h1>
              <form className="form-horizontal" onSubmit={this.onSubmit}>
                <Input type="text" valueLink={this.linkState('username')} label="Username" labelClassName="col-xs-2" wrapperClassName="col-xs-6"/>
                <Input type="password" valueLink={this.linkState('password')} label="Password" labelClassName="col-xs-2" wrapperClassName="col-xs-6"/>
                <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-primary">Sign in</button>
                </div>
                </div>
              </form>
            </div>
        );
    }
});
