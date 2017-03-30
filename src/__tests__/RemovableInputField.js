import React from 'react';
import RemovableInputField from '../Utils/RemovableInputField.js';
import renderer from 'react-test-renderer';
let instance;

test('Handling ProductView Filter input', () => {
    const callbackMock = jest.fn();
    renderer.create(
        <RemovableInputField ref={(child) => {instance = child}}
                             id='0' value=''
                             onInputChange={callbackMock}/>
    );
    const event = {target: {}};
    instance.handleInput(event);
    expect(callbackMock).toBeCalled();
});