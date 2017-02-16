import React from 'react';
import ProductView from '../../ProductView/ProductView.js';
import renderer from 'react-test-renderer';
import TestProduct from './../testData/product.js'
import TestEventTypes from './../testData/eventTypes.js'
import TestEvents from './../testData/events.js'
let instance;

test("Rendering of ProductView", () => {
    let mockCallback = jest.fn();
    const component = renderer.create(
        <ProductView
            ref={(child) => {instance = child}}
            dataSource={{fetchProduct: mockCallback, fetchEventTypesOf: mockCallback, fetchEventsOf: mockCallback}}
            params={{productId: 0}}/>
    );
    instance.handleProductData(TestProduct.PRODUCT);
    instance.handleEventTypeData(TestEventTypes.EVENTTYPES);
    instance.loadEventsFor(TestEventTypes.EVENTTYPES[0]);
    instance.handleEventData(TestEvents.EVENTS);

    expect(mockCallback).toHaveBeenCalledTimes(3);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    instance.handleError(404);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Changing filter input', () => {
    let mockCallback = jest.fn();
    renderer.create(
        <ProductView
            ref={(child) => {instance = child}}
            dataSource={{fetchProduct: mockCallback, fetchEventTypesOf: mockCallback, fetchEventsOf: mockCallback}}
            params={{productId: 0}}/>
    );
    expect(instance.state.filter).toHaveLength(1);
    instance.onChangeFilterInput(0, 'Query');
    expect(instance.state.filter).toHaveLength(2);
    expect(instance.state.filter[0].value).toMatch('Query');
    instance.onChangeFilterInput(0, 'NextQuery');
    expect(instance.state.filter[0].value).toMatch('NextQuery');
});