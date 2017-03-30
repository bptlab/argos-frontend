import React from 'react';
import RemovableInputField from '../Utils/RemovableInputField.js';
import renderer from 'react-test-renderer';
let instance;

test("Rendering of RemovableInputField with button", () => {
    const callbackMock = jest.fn();
    const component = renderer.create(
        <RemovableInputField ref={(child) => {instance = child}}
                             id='0' value=''
                             onInputChange={callbackMock}
                             showRemove={true}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Handling ProductView Filter input', () => {
    const callbackMock = jest.fn();
    renderer.create(
        <RemovableInputField ref={(child) => {instance = child}}
                             id='0' value=''
                             onInputChange={callbackMock}
                             showRemove={false}/>
    );
    const event = {target: {}};
    instance.handleInput(event);
    expect(callbackMock).toBeCalled();
});