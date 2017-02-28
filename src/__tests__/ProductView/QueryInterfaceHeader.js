import React from 'react';
import QueryInterfaceHeader from '../../ProductView/TabBar/QueryInterface/QueryInterfaceHeader/QueryInterfaceHeader.js';
import renderer from 'react-test-renderer';
let instance;

test('On change eventtype name callback test', () => {
    const callbackMock = jest.fn();
    renderer.create(
        <QueryInterfaceHeader
            ref={(child) => {instance = child}}
            eventTypeAttributes={[]}
            onChangeEventTypeName={callbackMock}/>
    );
    const event = {target: {value: 'test'}};
    instance.onChangeEventTypeName(event);
    expect(callbackMock).toBeCalledWith('test');

});