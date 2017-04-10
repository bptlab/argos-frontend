import React from 'react';
import renderer from 'react-test-renderer';
import ConfirmOverlay from "../../Utils/ConfirmOverlay/ConfirmOverlay";
let instance, component;

const submitMockCallback = jest.fn();
const abortMockCallback = jest.fn();

beforeEach(() => {
    component = renderer.create(
        <ConfirmOverlay
            ref={(child) => {
                instance = child
            }}
            onSubmit={submitMockCallback}
            onAbort={abortMockCallback}/>
    );
});

test('On submit callback test', () => {
    instance.onSubmit();
    expect(submitMockCallback).toBeCalled();
});

test('On abort callback test', () => {
    instance.onAbort();
    expect(abortMockCallback).toBeCalled();
});