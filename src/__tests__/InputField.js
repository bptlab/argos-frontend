import React from 'react';
import InputField from '../Utils/InputField/InputField.js';
import renderer from 'react-test-renderer';
let instance;

test('Handling ProductView Filter input', () => {
    const callbackMock = jest.fn();
    renderer.create(
        <InputField ref={(child) => {instance = child}}
                id='0' value=''
                onInputChange={callbackMock}/>
    );
    const event = {target: {}};
    instance.handleInput(event);
    expect(callbackMock).toBeCalled();
});