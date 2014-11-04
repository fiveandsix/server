/**
 * @jsx React.DOM
 */

var React = require('react');

var ApplicationStore = require('../stores/ApplicationStore');

var Loading = require('./Loading.react');
var Login = require('./Login.react');
var Failure = require('./Failure.react');
var Home = require('./Home.react');

function getState() {
    return {
        state: ApplicationStore.state()
    };
}

module.exports = React.createClass({
    getInitialState: function() {
        return getState();
    },

    componentDidMount: function() {
        ApplicationStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ApplicationStore.removeChangeListener(this._onChange);
    },

   _onChange: function() {
        this.setState(getState());
    },

    render: function() {
        var contents;
        if(this.state.state == 'LOADING') {
            contents = <Loading/>;
        } else if(this.state.state == 'LOGIN') {
            contents = <Login/>;
        } else if(this.state.state == 'STARTED') {
            contents = <Home/>;
        } else {
            contents = <Failure/>;
        }

        return (
                <div id="application">
                {contents}
                </div>
        );
    }
});
