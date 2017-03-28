import React from 'react';
import QueryInterfaceAttributeList from '../../ProductView/TabBar/QueryInterface/QueryInterfaceAttributeList/QueryInterfaceAttributeList.js';
import renderer from 'react-test-renderer';

let instance, component;
const callbackMock = jest.fn();

beforeEach(() => {
    component = renderer.create(
        <QueryInterfaceAttributeList
            ref={(child) => {instance = child}}
            eventTypeAttributes={[]}
            onChangeEventTypeName={callbackMock}/>
    );
});

test('On change eventtype name callback test', () => {
    const event = {target: {value: 'test'}};
    instance.onChangeEventTypeName(event);
    expect(callbackMock).toBeCalledWith('test');

});

test('Form validation for query name', () => {3
    instance.queryNameFormValidation('');

});