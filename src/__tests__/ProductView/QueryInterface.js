import React from 'react';
import QueryInterface from '../../ProductView/TabBar/QueryInterface/QueryInterface.js';
import renderer from 'react-test-renderer';
let instance;

test('Handling change query', () => {
    const component = renderer.create(
        <QueryInterface
            ref={(child) => {instance = child}}
            defaultQuery=""/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    const event = {target: {value: 'TEST'}};
    instance.handleChangeQuery(event);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Handling change attribute type', () => {
    renderer.create(
        <QueryInterface
            ref={(child) => {instance = child}}
            defaultQuery=""/>
    );
    instance.handleChangeEventTypeName('Test');
    expect(instance.state.eventTypeName).toBe('Test');

});

test('Handling change attribute type', () => {
    renderer.create(
        <QueryInterface
            ref={(child) => {instance = child}}
            defaultQuery=""/>
    );
    instance.handleChangeAttributeName(0, 'Test');
    expect(instance.state.eventTypeAttributes[0].name).not.toBe('Test');
    instance.handleChangeAttributeName(2, 'Test');
    expect(instance.getEventTypeAttribute(2).name).toBe('Test');
    expect(instance.state.eventTypeAttributes.length).toBe(4);
    instance.handleChangeAttributeName(2, '');
    expect(instance.state.eventTypeAttributes.length).toBe(3);
});

test('Handling change attribute type', () => {
    renderer.create(
        <QueryInterface
            ref={(child) => {instance = child}}
            defaultQuery=""/>
    );
    instance.handleChangeAttributeType(0, 'STRING');
    expect(instance.state.eventTypeAttributes[0].type).not.toBe('STRING');
    instance.handleChangeAttributeType(2, 'INTEGER');
    expect(instance.state.eventTypeAttributes[2].type).toBe('INTEGER');

});

test('Handling save query', () => {
    const callbackMock = jest.fn();
    const dataSender = {'createEventtype': callbackMock};
    renderer.create(
        <QueryInterface
            ref={(child) => {instance = child}}
            dataSender={dataSender}
            defaultQuery=""/>
    );
    instance.handleSaveQuery();
    expect(callbackMock).toBeCalled();
});