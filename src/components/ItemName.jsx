var React = require('react');

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
        return this.props.isEditable ? edit : display;
    }
});

module.exports = ItemName;