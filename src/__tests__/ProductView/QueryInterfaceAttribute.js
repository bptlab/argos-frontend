import React from 'react';
import QueryInterfaceAttribute from '../../ProductView/TabBar/QueryInterface/QueryInterfaceAttributeList/QueryInterfaceAttribute/QueryInterfaceAttribute.js';
import renderer from 'react-test-renderer';

let instance;
const callbackMock = jest.fn();

beforeEach(() => {
    const eventTypeAttribute = {id: 0};
    renderer.create(
        <QueryInterfaceAttribute
            ref={(child) => {instance = child}}
            eventTypeAttribute={eventTypeAttribute}
            onChangeAttributeName={callbackMock}
            onChangeAttributeType={callbackMock}/>
    );
});

test('On change attribute name callback test', () => {
    const event = {target: {value: 'test'}};
    instance.onChangeAttributeName(event);
    expect(callbackMock).toBeCalledWith(0, 'test');
});

test('On change attribute type callback test', () => {
    const event = {target: {value: 'INTEGER'}};
    instance.onChangeAttributeType(event);
    expect(callbackMock).toBeCalledWith(0, 'INTEGER');
});