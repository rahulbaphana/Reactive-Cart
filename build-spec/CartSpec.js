describe("Cart", function(){
    var TestUtils = React.addons.TestUtils;

    it("should append entered item name with quantity to list when Add is clicked", function(){
        var cart = TestUtils.renderIntoDocument(
            React.createElement(Cart, null)
        );

        var inputForm = TestUtils.findRenderedComponentWithType(cart, InputForm);
        var itemNameInput = TestUtils.findRenderedDOMComponentById(inputForm, 'item');
        var itemQuantityInput = TestUtils.findRenderedDOMComponentById(inputForm, 'quantity');
        var addButton = TestUtils.findRenderedDOMComponentById(inputForm, 'add');

        TestUtils.Simulate.change(itemNameInput.getDOMNode(), {target: {value: 'test-input'}});
        TestUtils.Simulate.change(itemQuantityInput.getDOMNode(), {target: {value: 11}});
        TestUtils.Simulate.click(addButton.getDOMNode());

        var itemsInCart = TestUtils.scryRenderedDOMComponentsWithTag(cart,'li');
        var addedItem = itemsInCart[itemsInCart.length - 1];

        expect(addedItem.getDOMNode().textContent).toBe("test-input - 11");
    });


    it("should update total quantity when new item is added",function(){
        var inputData = [
            {id: 1, name: 'Apple', quantity: 2},
            {id: 2, name: 'Orange', quantity: 5},
            {id: 3, name: 'Mango', quantity: 6},
            {id: 4, name: "Jamun", quantity: 11}
        ];

        var cart = TestUtils.renderIntoDocument(
            React.createElement(Cart, {data: inputData})
        );

        var inputForm = TestUtils.findRenderedComponentWithType(cart, InputForm);
        var totalItems = TestUtils.findRenderedComponentWithType(cart, TotalItems);
        var itemNameInput = TestUtils.findRenderedDOMComponentById(inputForm, 'item');
        var itemQuantityInput = TestUtils.findRenderedDOMComponentById(inputForm, 'quantity');
        var addButton = TestUtils.findRenderedDOMComponentById(inputForm, 'add');

        TestUtils.Simulate.change(itemNameInput.getDOMNode(), {target: {value: 'test-input'}});
        TestUtils.Simulate.change(itemQuantityInput.getDOMNode(), {target: {value: 11}});
        TestUtils.Simulate.click(addButton.getDOMNode());

        expect(totalItems.props.totalQuantity).toBe(35);
    });

    it("should update total quantity when new item is added",function(){
        var inputData = [
            {id: 1, name: 'Apple', quantity: 2},
            {id: 2, name: 'Orange', quantity: 5},
            {id: 3, name: 'Mango', quantity: 6},
            {id: 4, name: "Jamun", quantity: 11}
        ];

        var cart = TestUtils.renderIntoDocument(
            React.createElement(Cart, {data: inputData})
        );

        var inputForm = TestUtils.findRenderedComponentWithType(cart, InputForm);
        var totalItems = TestUtils.findRenderedComponentWithType(cart, TotalItems);
        var itemNameInput = TestUtils.findRenderedDOMComponentById(inputForm, 'item');
        var itemQuantityInput = TestUtils.findRenderedDOMComponentById(inputForm, 'quantity');
        var addButton = TestUtils.findRenderedDOMComponentById(inputForm, 'add');

        TestUtils.Simulate.change(itemNameInput.getDOMNode(), {target: {value: 'Mango'}});
        TestUtils.Simulate.change(itemQuantityInput.getDOMNode(), {target: {value: 11}});
        TestUtils.Simulate.click(addButton.getDOMNode());

        expect(totalItems.props.totalQuantity).toBe(29);
    });
});