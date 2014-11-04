/**
 * @jsx React.DOM
 */

var React = require('react');
var Application = require('./components/Application.react');
var ApplicationActions = require('./actions/ApplicationActions');

console.log('starting the app');
try {
    React.renderComponent(<Application/>, document.getElementById('react-root'));
    ApplicationActions.start();
} catch(e) {
    console.error('error staring the app', e);
}
