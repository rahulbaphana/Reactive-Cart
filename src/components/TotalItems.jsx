var React = require('react');

var TotalItems = React.createClass({
    render: function () {
        return (<div> Total Quantity : <span id="displayQuantity">{this.props.totalQuantity}</span></div>);
    }
});

module.exports = TotalItems;