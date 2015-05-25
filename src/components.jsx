var Cart = React.createClass({
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
            <div id="cart">
                <InputForm action={this.addItem} />
                <CartItems items={this.state.items}></CartItems>
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
    handleQuantityChange: function(event){
        this.setState({
            quantity: parseInt(event.target.value, 10) || 0
        });
    },
    handleClick: function(event){
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
                <input type="number" id="quantity" defaultValue={this.state.quantity} onChange={this.handleQuantityChange}/>
                {this.state.isAddEnabled ? enabledButton : disabledButton}
            </div>
        );
    }
});

var CartItems = React.createClass({
    render: function () {
        var itemNames = this.props.items.map(function (item) {
            return (<li key={item.name}>{item.name} - {item.quantity}</li>);
        });

        return (
            <ul>
                {itemNames}
            </ul>
        );
    }
});

var TotalItems = React.createClass({
    render: function () {
        return (<div> Total Quantity : <span id="displayQuantity">{this.props.totalQuantity}</span></div>);
    }
});