import React from 'react';
import Tab from '../../ProductView/TabBar/Tab/Tab.js';
import renderer from 'react-test-renderer';
let instance;

test('Clicking ProductView Tab', () => {
    const setActiveEventType = jest.fn();
    renderer.create(
        <Tab ref={(child) => {instance = child}} 
             eventType={{}}
             setActiveEventType={setActiveEventType} 
             product={{}}
            />
    );
    instance.setActiveEventType();
    expect(setActiveEventType).toBeCalled();
});