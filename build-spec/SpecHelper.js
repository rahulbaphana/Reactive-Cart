'use strict';

React.addons.TestUtils.findRenderedDOMComponentById = function (root, id) {
    return React.addons.TestUtils.findAllInRenderedTree(root, function (ele) {
        return ele.getDOMNode().getAttribute('id') === id;
    })[0];
};