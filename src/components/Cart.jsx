var React = require('react');
var Link = require('react-router').Link;

var InputForm = require('./InputForm.jsx');
var CartItems = require('./CartItems.jsx');
var TotalItems = require('./TotalItems.jsx');
var CheckoutButton = require('./CheckoutButton.jsx');

var Cart = React.createClass({
    compareItems: function (a, b) {
        return a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())
    },
    getInitialState: function () {
        var data = this.props.data || [];
        data.sort(this.compareItems);
        return {
            items: data.map(function (item) {
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
        var replace = function (array, element, index) {
            if(index < 0 || index >= array.length){
                throw new Error("Index out of bounds!");
            }
            array[index] = element;
            return array;
        };

        var updatedItems = newItem ? items.concat(item) : replace(items, item, index);
        updatedItems.sort(this.compareItems);
        this.setState({
            items: updatedItems
        });
    },
    removeItem: function (name) {
        var index = this.state.items.findIndex(function (ele) {
            return ele.name.toLocaleLowerCase() === name.toLocaleLowerCase()
        });

        var remove = function (array, index) {
            if(index < 0 || index >= array.length){
                throw new Error("Index out of bounds!");
            }
            return array.slice(0,index).concat(array.slice(index+1));
        };

        this.setState({
            items: remove(this.state.items, index)
        });
    },
    editItem: function (name, item) {
        var index = this.state.items.findIndex(function (ele) {
            return ele.name.toLocaleLowerCase() === name.toLocaleLowerCase()
        });

        var updateItems = this.state.items;
        updateItems[index].name = item.name || updateItems[index].name;
        updateItems[index].edit = item.edit;
        this.setState({
            items: updateItems.sort(this.compareItems)
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
                <CheckoutButton isEnabled={total > 0}/>
            </div>
        );
    }
});


module.exports = Cart;