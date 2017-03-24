import React from 'react';
import QueryInterfaceAttributeList from '../../ProductView/TabBar/QueryInterface/QueryInterfaceAttributeList/QueryInterfaceAttributeList.js';
import renderer from 'react-test-renderer';
let instance;

test('On change eventtype name callback test', () => {
    const callbackMock = jest.fn();
    renderer.create(
        <QueryInterfaceAttributeList
            ref={(child) => {instance = child}}
            eventTypeAttributes={[]}
            onChangeEventTypeName={callbackMock}/>
    );
    const event = {target: {value: 'test'}};
    instance.onChangeEventTypeName(event);
    expect(callbackMock).toBeCalledWith('test');

});