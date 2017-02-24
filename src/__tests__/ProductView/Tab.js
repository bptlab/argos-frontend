import React from 'react';
import Tab from '../../ProductView/TabBar/Tab/Tab.js';
import renderer from 'react-test-renderer';
let instance;

test('Clicking ProductView Tab', () => {
    const loadEventsFor = jest.fn();
    const notificationService = {
        subscribe: jest.fn(),
        unsubscribe: jest.fn()
    };
    renderer.create(
        <Tab ref={(child) => {instance = child}} 
             eventType={{}}
             loadEventsFor={loadEventsFor} 
             product={{}}
             notificationService={notificationService}
            />
    );
    instance.loadEventsFor();
    instance.componentWillUnmount();
    expect(loadEventsFor).toBeCalled();
    expect(notificationService.subscribe).toBeCalled();
    expect(notificationService.unsubscribe).toBeCalled();
});