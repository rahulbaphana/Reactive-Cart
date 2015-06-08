var React = require('react');

var InputForm = React.createClass({
    getInitialState: function () {
        return {
            isAddEnabled: false,
            itemName: "",
            quantity: 1
        }
    },
    handleItemNameChange: function (event) {
        this.setState({
            isAddEnabled: !(event.target.value.trim() === ""),
            itemName: event.target.value.trim()
        });
    },
    handleQuantityChange: function (event) {
        this.setState({
            quantity: parseInt(event.target.value, 10) || 0
        });
    },
    handleClick: function (event) {
        this.props.action({name: this.state.itemName, quantity: this.state.quantity});
    },
    render: function () {
        var enabledButton = (<button type="submit" id="add" onClick={this.handleClick}>Add</button>);
        var disabledButton = (<button type="submit" id="add" disabled>Add</button>);
        return (
            <div id="form">
                Item :
                <input type="text" id="item" onChange={this.handleItemNameChange}/>
                Quantity :
                <input type="number" id="quantity" defaultValue={this.state.quantity}
                       onChange={this.handleQuantityChange}/>
                {this.state.isAddEnabled ? enabledButton : disabledButton}
            </div>
        );
    }
});

module.exports = InputForm;