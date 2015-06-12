var React = require('react');

var ItemName = require('./ItemName.jsx');
var RemoveButton = require('./RemoveButton.jsx');

var CartItems = React.createClass({
    render: function () {
        var itemNames = this.props.items.map((item, index) => {
            return (
                <li key={index} className="item">
                    <ItemName value={item.name} isEditable={item.edit} onEdit={this.props.editItem} /> -
                    <span className="item-quantity">{item.quantity}</span>
                    {item.edit ? <button>ok</button> : <RemoveButton name={item.name} action={this.props.remove}/>}
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

module.exports = CartItems;