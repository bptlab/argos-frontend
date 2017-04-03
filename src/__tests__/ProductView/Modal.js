import React from 'react';
import Modal from '../../Utils/Modal/Modal.js';
import renderer from 'react-test-renderer';
let instance;

test('On save callback test', () => {
    const callbackMock = jest.fn();
    renderer.create(
        <Modal
            ref={(child) => {instance = child}}
            onSubmit={callbackMock}/>
    );
    instance.onSubmit();
    expect(callbackMock).toBeCalled();

});