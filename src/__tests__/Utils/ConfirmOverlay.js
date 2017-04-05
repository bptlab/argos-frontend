import React from 'react';
import renderer from 'react-test-renderer';
import ConfirmOverlay from "../../Utils/ConfirmOverlay/ConfirmOverlay";
let instance;

test('On submit callback test', () => {
    const callbackMock = jest.fn();
    renderer.create(
        <ConfirmOverlay
            ref={(child) => {instance = child}}
            onSubmit={callbackMock} />
    );
    instance.onSubmit();
    expect(callbackMock).toBeCalled();
});

test('On abort callback test', () => {
    const callbackMock = jest.fn();
    renderer.create(
        <ConfirmOverlay
            ref={(child) => {instance = child}}
            onAbort={callbackMock} />
    );
    instance.onAbort();
    expect(callbackMock).toBeCalled();
});