import React from 'react';
import Tab from '../../ProductView/TabBar/Tab/Tab.js';
import renderer from 'react-test-renderer';
let instance;

test('Clicking ProductView Tab', () => {
    let callbackMock = jest.fn();
    renderer.create(
        <Tab ref={(child) => {instance = child}}
             eventType={{}}
             loadEventsFor={callbackMock}
             product={{}}/>
    );
    instance.loadEventsFor();
    expect(callbackMock).toBeCalled();
});