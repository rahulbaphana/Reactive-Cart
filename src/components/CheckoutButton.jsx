var React = require('react');

var CheckoutButton = React.createClass({
    render: function() {
        var enabled = (<button className="greenButton">Checkout</button>);
        var disabled = (<button className="greenButton" disabled='true'>Checkout</button>);
        return this.props.isEnabled ? enabled : disabled;
    }
});

module.exports = CheckoutButton;