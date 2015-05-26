"use strict";

var Cart = React.createClass({ displayName: "Cart",
    getInitialState: function getInitialState() {
        return {
            items: this.props.data || []
        };
    },
    addItem: function addItem(item) {
        var items = this.state.items;
        var index = items.findIndex(function (ele) {
            return ele.name.toLocaleLowerCase() === item.name.toLocaleLowerCase();
        });
        var newItem = index === -1;

        item.name = newItem ? item.name : items[index].name;
        this.setState({
            items: newItem ? items.concat(item) : items.replace(item, index)
        });
    },
    removeItem: function removeItem(name) {
        var index = this.state.items.findIndex(function (ele) {
            return ele.name.toLocaleLowerCase() === name.toLocaleLowerCase();
        });

        this.setState({
            items: this.state.items.remove(index)
        });
    },
    render: function render() {
        var total = this.state.items.reduce(function (acc, item) {
            return acc + item.quantity;
        }, 0);

        return React.createElement("div", { id: "cart" }, React.createElement(InputForm, { action: this.addItem }), React.createElement(CartItems, { items: this.state.items, remove: this.removeItem }), React.createElement(TotalItems, { totalQuantity: total }));
    }
});

var InputForm = React.createClass({ displayName: "InputForm",
    getInitialState: function getInitialState() {
        return {
            isAddEnabled: false,
            itemName: "",
            quantity: 1
        };
    },
    handleItemNameChange: function handleItemNameChange(event) {
        this.setState({
            isAddEnabled: !(event.target.value.trim() === ""),
            itemName: event.target.value.trim()
        });
    },
    handleQuantityChange: function handleQuantityChange(event) {
        this.setState({
            quantity: parseInt(event.target.value, 10) || 0
        });
    },
    handleClick: function handleClick(event) {
        this.props.action({ name: this.state.itemName, quantity: this.state.quantity });
    },
    render: function render() {
        var enabledButton = React.createElement("button", { type: "submit", id: "add", onClick: this.handleClick }, "Add");
        var disabledButton = React.createElement("button", { type: "submit", id: "add", disabled: true }, "Add");
        return React.createElement("div", { id: "form" }, "Item :", React.createElement("input", { type: "text", id: "item", onChange: this.handleItemNameChange }), "Quantity :", React.createElement("input", { type: "number", id: "quantity", defaultValue: this.state.quantity,
            onChange: this.handleQuantityChange }), this.state.isAddEnabled ? enabledButton : disabledButton);
    }
});

var CartItems = React.createClass({ displayName: "CartItems",
    render: function render() {
        var _this = this;
        var itemNames = this.props.items.map(function (item, index) {
            return React.createElement("li", { key: index }, React.createElement("span", null, item.name, " - ", item.quantity), React.createElement(RemoveButton, { name: item.name, action: _this.props.remove }));
        });

        return React.createElement("ul", null, itemNames);
    }
});

var RemoveButton = React.createClass({ displayName: "RemoveButton",
    handleClick: function handleClick(event) {
        this.props.action(this.props.name);
    },
    render: function render() {
        return React.createElement("button", { className: "removeButton", onClick: this.handleClick }, "x");
    }
});

var TotalItems = React.createClass({ displayName: "TotalItems",
    render: function render() {
        return React.createElement("div", null, " Total Quantity : ", React.createElement("span", { id: "displayQuantity" }, this.props.totalQuantity));
    }
});