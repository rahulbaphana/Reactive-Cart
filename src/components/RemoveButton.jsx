var React = require('react');

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

module.exports = RemoveButton;