React.addons.TestUtils.findRenderedDOMComponentById = (root, id) => {
    return React.addons.TestUtils.findAllInRenderedTree(root, (ele) => (
    ele.getDOMNode().getAttribute('id') === id)
    )[0];
};