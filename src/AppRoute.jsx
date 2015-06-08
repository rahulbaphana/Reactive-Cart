var React = require('react');
var Router = require('react-router');
var {Route, RouteHandler, DefaultRoute} = Router;


var App = React.createClass({
    render () {
        return (
            <RouteHandler />
        )
    }
});

var routes = (
    <Route handler={App}>
        <Route path="checkout" name="checkout" handler={Checkout} />
        <DefaultRoute name="cart" handler={Cart} />
    </Route>
);
