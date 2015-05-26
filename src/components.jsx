var Cart = React.createClass({
    getInitialState: function () {
        return {
            items: this.props.data || []
        }
    },
    addItem: function (item) {
        var items = this.state.items;
        var index = items.findIndex(function (ele) {
            return ele.name.toLocaleLowerCase() === item.name.toLocaleLowerCase()
        });
        var newItem = index === -1;

        item.name = newItem ? item.name : items[index].name;
        this.setState({
            items: newItem ? items.concat(item) : items.replace(item, index)
        });
    },
    removeItem: function(name){
        var index = this.state.items.findIndex(function (ele) {
            return ele.name.toLocaleLowerCase() === name.toLocaleLowerCase()
        });

        this.setState({
            items: this.state.items.remove(index)
        });
    },
    render: function () {
        var total = this.state.items.reduce(function (acc, item) {
            return acc + item.quantity;
        }, 0);

        return (
            <div id="cart">
                <InputForm action={this.addItem}/>
                <CartItems items={this.state.items} remove={this.removeItem}></CartItems>
                <TotalItems totalQuantity={total}></TotalItems>
            </div>
        );
    }
});

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

var CartItems = React.createClass({
    render: function () {
        var _this = this;
        var itemNames = this.props.items.map(function (item, index) {
            return (
                <li key={index}>
                    <span>{item.name} - {item.quantity}</span>
                    <RemoveButton name={item.name} action={_this.props.remove}/>
                </li>
            );
        });

        return (
            <ul>
                {itemNames}
            </ul>
        );
    }
});

var RemoveButton = React.createClass({
    handleClick: function(event){
        this.props.action(this.props.name);
    },
    render: function () {
        return (
            <button className="removeButton" onClick={this.handleClick}>x</button>
        );
    }
});

var TotalItems = React.createClass({
    render: function () {
        return (<div> Total Quantity : <span id="displayQuantity">{this.props.totalQuantity}</span></div>);
    }
});