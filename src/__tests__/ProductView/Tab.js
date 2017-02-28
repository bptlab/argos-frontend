import React from 'react';
import Tab from '../../ProductView/TabBar/Tab/Tab.js';
import renderer from 'react-test-renderer';
let instance;

test('Clicking ProductView Tab', () => {
    const setActiveEventType = jest.fn();
    const notificationService = {
        subscribe: jest.fn(),
        unsubscribe: jest.fn()
    };
    renderer.create(
        <Tab ref={(child) => {instance = child}} 
             eventType={{}}
             setActiveEventType={setActiveEventType} 
             product={{}}
             notificationService={notificationService}
            />
    );
    instance.setActiveEventType();
    instance.componentWillUnmount();
    expect(setActiveEventType).toBeCalled();
    expect(notificationService.subscribe).toBeCalled();
    expect(notificationService.unsubscribe).toBeCalled();
});