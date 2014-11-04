/**
 * @jsx React.DOM
 */

var React = require('react');
var Modal = require('react-bootstrap/Modal');
var Button = require('react-bootstrap/Button');
var TaskActions = require('../actions/TaskActions');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            delete: false
        };
    },

    onHide: function() {
        this.setState({delete: false});
    },

    onDelete: function() {
        this.setState({delete: true});
    },

    onDeleteConfirmed: function() {
        TaskActions.remove_task(this.props.task);
        this.setState({delete: false});
    },

    render: function() {
        var deleteModal = this.state.delete ? (
                <Modal title="Delete Task?" backdrop={false} animation={false} onRequestHide={this.onHide}>
                <div className="modal-body">
                Are you sure you want to delete the <strong>{this.props.task.title}</strong> task?
                </div>
                <div className="modal-footer">
                <Button onClick={this.onHide}>Don't delete</Button>
                <Button bsStyle="primary" onClick={this.onDeleteConfirmed}>Delete</Button>
                </div>
                </Modal>
        ) : null;
        return (
                <div>
                <Button bsSize="xsmall" className="pull-right" onClick={this.onDelete}>Delete</Button>
                <h4>{this.props.task.title}</h4>
                {deleteModal}
                </div>
        );
    }
});
