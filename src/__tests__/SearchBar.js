import React from 'react';
import SearchBar from '../DashboardView/SearchBar/SearchBar.js';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-addons-test-utils' // ES6

test("Correct drawing of SearchBar", () => {
    const component = renderer.create(
        <SearchBar
            onChangeSearchInput={() => {/*Only testing drawing */}}
            searchText={""}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Correct extraction of data for displaying", () => {
    const callbackMock = jest.fn();
    const component = ReactTestUtils.renderIntoDocument(
        <SearchBar
            onChangeSearchInput={callbackMock}
            searchText={""}/>
    );
    const node = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'input')
    node.value = 'Test';
    ReactTestUtils.Simulate.change(node);
    ReactTestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});
    expect(callbackMock).toHaveBeenCalledWith('Test');
});