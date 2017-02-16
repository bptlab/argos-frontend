import React from 'react';
import Filter from '../../ProductView/FilterBar/Filter/Filter.js';
import renderer from 'react-test-renderer';
let instance;

test('Handling ProductView Filter input', () => {
    let callbackMock = jest.fn();
    renderer.create(
        <Filter ref={(child) => {instance = child}}
                id='0' value=''
                onChangeFilterInput={callbackMock}/>
    );
    let event = {target: {}};
    instance.handleFilterInput(event);
    expect(callbackMock).toBeCalled();
});