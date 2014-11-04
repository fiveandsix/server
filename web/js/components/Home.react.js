/**
 * @jsx React.DOM
 */

var React = require('react');
var PageHeader = require('react-bootstrap/PageHeader');
var Nav = require('react-bootstrap/Nav');
var NavItem = require('react-bootstrap/NavItem');
var Button = require('react-bootstrap/Button');
var Tasks = require('./Tasks.react');
var NewTask = require('./NewTask.react');

var ApplicationActions = require('../actions/ApplicationActions');
var ApplicationStore = require('../stores/ApplicationStore');

function getState() {
    return {
        page: ApplicationStore.page()
    };
};

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

    onSelect: function(selected) {
        if(selected == 'logout') {
            ApplicationActions.logout();
        } else {
            ApplicationActions.set_page(selected);
        }
    },

    render: function() {

        var navigation = (
                <Nav bsStyle="pills" activeKey={this.state.page} onSelect={this.onSelect}>
                <NavItem key="tasks">Tasks</NavItem>
                <NavItem key="new">New Task</NavItem>
                <NavItem key="logout">Logout</NavItem>
                </Nav>
        );

        var page;

        if(this.state.page == 'tasks') {
            page = <Tasks/>;
        } else if(this.state.page == 'new') {
            page = <NewTask/>;
        }

        return (
                <div id="home" className="container">
                <PageHeader>Welcome, now Act! </PageHeader>
                {navigation}
                <div style={{height: '2em'}}/>
                {page}
                </div>
        );
    }
});
