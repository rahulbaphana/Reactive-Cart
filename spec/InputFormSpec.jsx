describe("InputForm", function() {
    var TestUtils = React.addons.TestUtils;

    it("should disable the Add button on page load", function() {
        var inputForm = TestUtils.renderIntoDocument(
            <InputForm  />
        );
        var addButton = TestUtils.findRenderedDOMComponentById(inputForm, 'add');
        expect(addButton.getDOMNode().disabled).toBe(true);
    });

    it("should enable Add when item name is entered", function(){
        var inputForm = TestUtils.renderIntoDocument(
            <InputForm />
        );
        var addButton = TestUtils.findRenderedDOMComponentById(inputForm, 'add');
        var itemNameInput = TestUtils.findRenderedDOMComponentById(inputForm, 'item');

        TestUtils.Simulate.change(itemNameInput.getDOMNode(), {target: {value: 'test-input'}});

        expect(addButton.getDOMNode().disabled).toBe(false);
    });

});


