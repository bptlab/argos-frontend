import React from 'react';
import FilterBar from '../../ProductView/FilterBar/FilterBar.js';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-addons-test-utils'

let instance, callbackMock, filter1, filter2;

beforeAll(() => {
    callbackMock = jest.fn();
    filter1 = {id: '0', value: 'foo', column: null};
    filter2 = {id: '1', value: '', column: null};
});

test("Rendering of FilterBar", () => {
    const component = renderer.create(
        <FilterBar
            ref={(child) => {instance = child}}
            onInputChange={callbackMock}
            filter={[filter1]} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Remove button is displayed correctly", () => {
    renderer.create(
        <FilterBar
            ref={(child) => {instance = child}}
            onInputChange={callbackMock}
            filter={[filter1,filter2]} />
    );

    expect(instance.decideOnRemoveButton(filter1)).toBeTruthy();
    expect(instance.decideOnRemoveButton(filter2)).toBeFalsy();
});

test("Handle click of remove button", () => {
    const rendered = ReactTestUtils.renderIntoDocument(<FilterBar
        ref={(child) => {instance = child}}
        onInputChange={callbackMock}
        filter={[filter1,filter2]} />);
    const deleteButton = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, "button");
    ReactTestUtils.Simulate.click(deleteButton);

    expect(callbackMock).toBeCalled();
});

