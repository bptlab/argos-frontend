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

test('Handling save query', () => {
    const callbackMock = jest.fn();
    renderer.create(
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