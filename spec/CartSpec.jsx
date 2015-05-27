describe("Cart", function(){
    var TestUtils = React.addons.TestUtils;
    var inputData = [];

    beforeEach(function(){
        inputData = [
            {name: 'Apple', quantity: 2},
            {name: 'Orange', quantity: 5},
            {name: "Jamun", quantity: 11},
            {name: 'Mango', quantity: 6}
        ];
    });

    it("should append entered item name with quantity to list when Add is clicked", function(){
        var cart = TestUtils.renderIntoDocument(
            <Cart />
        );

        var inputForm = TestUtils.findRenderedComponentWithType(cart, InputForm);
        var itemNameInput = TestUtils.findRenderedDOMComponentById(inputForm, 'item');
        var itemQuantityInput = TestUtils.findRenderedDOMComponentById(inputForm, 'quantity');
        var addButton = TestUtils.findRenderedDOMComponentById(inputForm, 'add');

        var addedItemName = "test-input";
        var addedQuantity = 11;
        TestUtils.Simulate.change(itemNameInput.getDOMNode(), {target: {value: addedItemName}});
        TestUtils.Simulate.change(itemQuantityInput.getDOMNode(), {target: {value: addedQuantity}});
        TestUtils.Simulate.click(addButton.getDOMNode());

        expect(cart.state.items[0].name).toBe(addedItemName);
        expect(cart.state.items[0].quantity).toBe(addedQuantity);
    });

    it("should update total quantity when new item is added",function(){
        var cart = TestUtils.renderIntoDocument(
            <Cart data={inputData}/>
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

    describe("should update item quantity when new item is added with same name",function(){
        it("be case sensitive",function(){
            var cart = TestUtils.renderIntoDocument(
                <Cart data={inputData}/>
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
            expect(cart.state.items.length).toBe(inputData.length);
        });

        it("and ignore case",function(){
            var cart = TestUtils.renderIntoDocument(
                <Cart data={inputData}/>
            );

            var inputForm = TestUtils.findRenderedComponentWithType(cart, InputForm);
            var totalItems = TestUtils.findRenderedComponentWithType(cart, TotalItems);
            var itemNameInput = TestUtils.findRenderedDOMComponentById(inputForm, 'item');
            var itemQuantityInput = TestUtils.findRenderedDOMComponentById(inputForm, 'quantity');
            var addButton = TestUtils.findRenderedDOMComponentById(inputForm, 'add');

            TestUtils.Simulate.change(itemNameInput.getDOMNode(), {target: {value: 'mango'}});
            TestUtils.Simulate.change(itemQuantityInput.getDOMNode(), {target: {value: 11}});
            TestUtils.Simulate.click(addButton.getDOMNode());

            expect(totalItems.props.totalQuantity).toBe(29);
            expect(cart.state.items.length).toBe(inputData.length);
        });
    });

    it("should remove item when 'x' is clicked",function(){
        var cart = TestUtils.renderIntoDocument(
            <Cart data={inputData}/>
        );

        var cartItems = TestUtils.findRenderedComponentWithType(cart, CartItems);
        var items = TestUtils.scryRenderedDOMComponentsWithTag(cartItems, 'li');
        var FIRST = 0;
        var itemToRemove = items[FIRST];
        var itemNameOfRemoved = cart.state.items[FIRST].name;
        var removeButton = TestUtils.findRenderedComponentWithType(itemToRemove, RemoveButton);
        TestUtils.Simulate.click(removeButton.getDOMNode());

        expect(cart.state.items.length).toBe(inputData.length-1);
        expect(cart.state.items[FIRST].name).not.toBe(itemNameOfRemoved);
    });

    describe("should sort items by name", function(){
        it("on Load",function(){
            var cart = TestUtils.renderIntoDocument(
                <Cart data={inputData}/>
            );

            expect(cart.state.items).toEqual([
                {name: 'Apple', quantity: 2, edit: false},
                {name: "Jamun", quantity: 11, edit: false},
                {name: 'Mango', quantity: 6, edit: false},
                {name: 'Orange', quantity: 5, edit: false}
            ]);
        });

        it("and on Add",function(){
            var cart = TestUtils.renderIntoDocument(
                <Cart data={inputData}/>
            );
            var inputForm = TestUtils.findRenderedComponentWithType(cart, InputForm);
            var itemNameInput = TestUtils.findRenderedDOMComponentById(inputForm, 'item');
            var itemQuantityInput = TestUtils.findRenderedDOMComponentById(inputForm, 'quantity');

            var addButton = TestUtils.findRenderedDOMComponentById(inputForm, 'add');

            var addedItemName = "Blackberry";
            var addedQuantity = 11;

            TestUtils.Simulate.change(itemNameInput.getDOMNode(), {target: {value: addedItemName}});
            TestUtils.Simulate.change(itemQuantityInput.getDOMNode(), {target: {value: addedQuantity}});
            TestUtils.Simulate.click(addButton.getDOMNode());

            expect(cart.state.items).toEqual([
                {name: 'Apple', quantity: 2, edit: false},
                {name: addedItemName, quantity: addedQuantity, edit: false},
                {name: "Jamun", quantity: 11, edit: false},
                {name: 'Mango', quantity: 6, edit: false},
                {name: 'Orange', quantity: 5, edit: false}
            ]);
        });
    });

    it("should update name of item when clicked and new name is entered",function(){
        var cart = TestUtils.renderIntoDocument(
            <Cart data={inputData}/>
        );

        var APPLE = 0;
        var cartItems = TestUtils.findRenderedComponentWithType(cart, CartItems);
        var itemToClick = (TestUtils.scryRenderedComponentsWithType(cartItems, ItemName))[APPLE];
        var itemInput = TestUtils.findRenderedDOMComponentWithClass(itemToClick, 'item-name');

        TestUtils.Simulate.click(itemInput.getDOMNode());

        var editableItem = TestUtils.findRenderedDOMComponentWithTag(itemToClick, "input");

        expect(editableItem.getDOMNode().value).toBe(inputData[APPLE].name);

        var BANANA = "Banana";
        TestUtils.Simulate.change(editableItem.getDOMNode(), {target: {value: BANANA}});
        editableItem.getDOMNode().value = BANANA;
        TestUtils.Simulate.blur(editableItem.getDOMNode());


        expect(cart.state.items[APPLE].name).toBe(BANANA);
    });
});