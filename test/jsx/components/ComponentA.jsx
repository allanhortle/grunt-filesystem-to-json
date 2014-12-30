/** @jsx React.DOM */
var React = require('react');

var ComponentA = React.createClass({
    displayName: 'ComponentA',
    propTypes: {
    	propA: React.PropTypes.string.isRequired,
    	propB: React.PropTypes.number,
    	propC: React.PropTypes.bool
    },
    render: function () {
        return (
            <div>ComponentA</div>
        );
    }
});

module.exports = ComponentA;