import React from 'react';
import Filter from '../../ProductView/FilterBar/Filter/Filter.js';
import renderer from 'react-test-renderer';
let instance;

test('Handling ProductView Filter input', () => {
    let callback = jest.fn();
    renderer.create(
        <Filter ref={(child) => {instance = child}}
                id='0' value=''
                onChangeFilterInput={callback}/>
    );
    let event = {target: {value: ''}};
    instance.handleFilterInput(event);
    expect(callback).toBeCalled();
});