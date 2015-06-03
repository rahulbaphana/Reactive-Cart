var Router = ReactRouter;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

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
