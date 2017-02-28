import React from 'react';
import Modal from '../../ProductView/TabBar/QueryInterface/Modal/Modal.js';
import renderer from 'react-test-renderer';
let instance;

test('On save callback test', () => {
    const callbackMock = jest.fn();
    renderer.create(
        <Modal
            ref={(child) => {instance = child}}
            onSave={callbackMock}/>
    );
    instance.onSave();
    expect(callbackMock).toBeCalled();

});