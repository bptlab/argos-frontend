import React from 'react';
import QueryInterface from '../../ProductView/TabBar/QueryInterface/QueryInterface.js';
import renderer from 'react-test-renderer';
import 'bootstrap';

let instance, component;
const callbackMock = jest.fn();

beforeEach(() => {
    const dataSender = {'createEventtype': callbackMock};
    component = renderer.create(
        <QueryInterface
            ref={(child) => {
                instance = child
            }}
            dataSender={dataSender}/>
    );
});

test('Handling change query', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    const event = {target: {value: 'TEST'}};
    instance.handleChangeQuery(event);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Handling change attribute type', () => {
    instance.handleChangeEventTypeName('Test');
    expect(instance.state.eventTypeName).toBe('Test');

});

test('Handling change attribute type', () => {
    instance.handleChangeAttributeName(0, 'Test');
    expect(instance.state.eventTypeAttributes[0].name).not.toBe('Test');
    instance.handleChangeAttributeName(2, 'Test');
    expect(instance.getEventTypeAttribute(2).name).toBe('Test');
    expect(instance.state.eventTypeAttributes.length).toBe(4);
    instance.handleChangeAttributeName(2, '');
    expect(instance.state.eventTypeAttributes.length).toBe(3);
});

test('Handling change attribute type', () => {
    instance.handleChangeAttributeType(0, 'STRING');
    expect(instance.state.eventTypeAttributes[0].type).not.toBe('STRING');
    instance.handleChangeAttributeType(2, 'INTEGER');
    expect(instance.state.eventTypeAttributes[2].type).toBe('INTEGER');

});

test('Handling save query', () => {
    instance.handleSaveQuery();
    expect(callbackMock).toBeCalled();
});

test('Handling save query failure', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    instance.handleSaveQuerySuccess();
    expect(instance.state.modalLoading).toBe(false);
});

test('Handling save query failure', () => {
    instance.handleSaveQueryError('test');
    expect(instance.state.modalLoading).toBe(false);
    expect(instance.state.errorMessage).toBe('test');
});

test('Form validation of event queries', () => {
    instance.eventQueryFormValidation('');
    expect(instance.state.validationClasses).toBe('has-danger');
    instance.eventQueryFormValidation('test');
    expect(instance.state.validationClasses).toBe('');
});