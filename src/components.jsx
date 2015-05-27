var Cart = React.createClass({
    compareItems: function(a,b){
        return a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())
    },
    getInitialState: function () {
        var data = this.props.data || [];
        data.sort(this.compareItems);
        return {
            items: data.map(function(item){
                item.edit = false;
                return item;
            })
        }
    },
    addItem: function (item) {
        var items = this.state.items;
        var index = items.findIndex(function (ele) {
            return ele.name.toLocaleLowerCase() === item.name.toLocaleLowerCase()
        });
        var newItem = index === -1;

        item.name = newItem ? item.name : items[index].name;
        item.edit = false;
        var updatedItems = newItem ? items.concat(item) : items.replace(item, index);
        updatedItems.sort(this.compareItems);
        this.setState({
            items: updatedItems
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
    editItem: function(name, item) {
        var index = this.state.items.findIndex(function (ele) {
            return ele.name.toLocaleLowerCase() === name.toLocaleLowerCase()
        });

        var updateItems = this.state.items;
        updateItems[index].name = item.name || updateItems[index].name;
        updateItems[index].edit = item.edit;
        this.setState({
            items:  updateItems.sort(this.compareItems)
        });
    },
    render: function () {
        var total = this.state.items.reduce(function (acc, item) {
            return acc + item.quantity;
        }, 0);

        return (
            <div id="cart">
                <InputForm action={this.addItem}/>
                <CartItems items={this.state.items} remove={this.removeItem} editItem={this.editItem}></CartItems>
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
                <li key={index} className="item">
                    <ItemName value={item.name} isEditable={item.edit} onEdit={_this.props.editItem}/> -
                    <span className="item-quantity">{item.quantity}</span>
                    {item.edit ? <button>ok</button> : <RemoveButton name={item.name} action={_this.props.remove}/>}
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

var ItemName = React.createClass({
    componentDidUpdate: function(){
        if(this.props.isEditable){
            React.findDOMNode(this.refs.inputName).focus();
        }
    },
    handleClick: function(event){
        this.props.onEdit(this.props.value, {edit: true});
    },
    handleBlur: function(){
        this.props.onEdit(this.props.value, {name: React.findDOMNode(this.refs.inputName).value ,edit: false});
    },
    render: function () {
        var display = <span className="item-name" onClick={this.handleClick} >{this.props.value}</span>;
        var edit = <input type="text" className="item-name-edit" onBlur={this.handleBlur} defaultValue={this.props.value} ref="inputName" />;
        return (
            <span>{this.props.isEditable ? edit : display}</span>
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