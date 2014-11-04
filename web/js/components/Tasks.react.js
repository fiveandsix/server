/**
 * @jsx React.DOM
 */

var React = require('react');
var TaskStore = require('../stores/TaskStore');
var Task = require('./Task.react');


function getState() {
    return {
        tasks: TaskStore.tasks()
    };
};

module.exports = React.createClass({
    getInitialState: function() {
        return getState();
    },

    componentDidMount: function() {
        TaskStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TaskStore.removeChangeListener(this._onChange);
    },

   _onChange: function() {
        this.setState(getState());
    },

    render: function() {

        var tasks = this.state.tasks.map(function(task) {
            return <Task task={task} key={task.id}/>;
        });

        return (
                <div id="tasks">
                {tasks}
                </div>
        );
    }
});
