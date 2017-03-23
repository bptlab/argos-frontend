import React from 'react';
import QueryInterfaceAttribute from '../../ProductView/TabBar/QueryInterface/QueryInterfaceAttributeList/QueryInterfaceAttribute/QueryInterfaceAttribute.js';
import renderer from 'react-test-renderer';
let instance;

test('On change attribute name callback test', () => {
    const callbackMock = jest.fn();
    const eventTypeAttribute = {id: 0};
    renderer.create(
        <QueryInterfaceHeaderAttribute
            ref={(child) => {instance = child}}
            eventTypeAttribute={eventTypeAttribute}
            onChangeAttributeName={callbackMock}/>
    );
    const event = {target: {value: 'test'}};
    instance.onChangeAttributeName(event);
    expect(callbackMock).toBeCalledWith(0, 'test');
});

test('On change attribute type callback test', () => {
    const callbackMock = jest.fn();
    const eventTypeAttribute = {id: 0};
    renderer.create(
        <QueryInterfaceAttribute
            ref={(child) => {instance = child}}
            eventTypeAttribute={eventTypeAttribute}
            onChangeAttributeType={callbackMock}/>
    );
    const event = {target: {value: 'INTEGER'}};
    instance.onChangeAttributeType(event);
    expect(callbackMock).toBeCalledWith(0, 'INTEGER');
});