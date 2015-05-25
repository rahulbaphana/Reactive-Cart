var Cart = React.createClass({displayName: "Cart",
    getInitialState: function () {
        return {
            items: this.props.data || []
        }
    },
    addItem: function(item){
      item.id = this.state.items.length + 1;
      this.setState({
          items: this.state.items.concat(item)
      });
    },
    render: function () {
        var total = this.state.items.reduce(function (acc, item) {
            return acc + item.quantity;
        }, 0);

        return (
            React.createElement("div", {id: "cart"}, 
                React.createElement(InputForm, {action: this.addItem}), 
                React.createElement(CartItems, {items: this.state.items}), 
                React.createElement(TotalItems, {totalQuantity: total})
            )
        );
    }
});

var InputForm = React.createClass({displayName: "InputForm",
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
    handleQuantityChange: function(event){
        this.setState({
            quantity: parseInt(event.target.value, 10) || 0
        });
    },
    handleClick: function(event){
        this.props.action({name: this.state.itemName, quantity: this.state.quantity});
    },
    render: function () {
        var enabledButton = (React.createElement("button", {type: "submit", id: "add", onClick: this.handleClick}, "Add"));
        var disabledButton = (React.createElement("button", {type: "submit", id: "add", disabled: true}, "Add"));
        return (
            React.createElement("div", {id: "form"}, 
                "Item :", 
                React.createElement("input", {type: "text", id: "item", onChange: this.handleItemNameChange}), 
                "Quantity :", 
                React.createElement("input", {type: "number", id: "quantity", defaultValue: this.state.quantity, onChange: this.handleQuantityChange}), 
                this.state.isAddEnabled ? enabledButton : disabledButton
            )
        );
    }
});

var CartItems = React.createClass({displayName: "CartItems",
    render: function () {
        var itemNames = this.props.items.map(function (item) {
            return (React.createElement("li", {key: item.name}, item.name, " - ", item.quantity));
        });

        return (
            React.createElement("ul", null, 
                itemNames
            )
        );
    }
});

var TotalItems = React.createClass({displayName: "TotalItems",
    render: function () {
        return (React.createElement("div", null, " Total Quantity : ", React.createElement("span", {id: "displayQuantity"}, this.props.totalQuantity)));
    }
});