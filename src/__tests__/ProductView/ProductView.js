import React from 'react';
import ProductView from '../../ProductView/ProductView.js';
import renderer from 'react-test-renderer';
import TestProduct from './../testData/product.js'
import TestEventTypes from './../testData/eventTypes.js'
import TestEvents from './../testData/events.js'

let instance, notificationService, component;

test("Rendering of ProductView", () => {
    const fetchProductMockCallback = jest.fn();
    const fetchEventTypesOfMockCallback = jest.fn();
    const fetchEventsOfMockCallback = (prodId, eventTypeId, succCallback, errCallback) => {
        succCallback(TestEvents.EVENTS);
    };
    notificationService = {
        subscribe: jest.fn(),
        unsubscribe: jest.fn()
    };
    component = renderer.create(
        <ProductView
            ref={(child) => {instance = child}}
            dataSource={{
                fetchProduct: fetchProductMockCallback,
                fetchEventTypesOf: fetchEventTypesOfMockCallback,
                fetchEventsOf: fetchEventsOfMockCallback,
                notificationService: notificationService
            }}
            params={{productId: 0}}/>
    );
    expect(fetchProductMockCallback).toBeCalled();
    instance.handleProductData(TestProduct.PRODUCT);
    expect(fetchEventTypesOfMockCallback).toBeCalled();
    instance.handleEventTypeData(TestEventTypes.EVENTTYPES);
    
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    //Two Tabs for two eventTypes and Event+Product on ProductView
    expect(notificationService.subscribe).toHaveBeenCalledTimes(3);
});

test('Update Event data', () => {
    //Use same Eventtype again to check other if branch
    instance.handleEventData(TestEventTypes.EVENTTYPES[0], TestEvents.EVENTS);
});

test('Successful filtering', () => {
   instance.onChangeFilterInput(0, 'Product');
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Changing active Tab', () => {
    instance.setActiveEventType(TestEventTypes.EVENTTYPES[0]);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Change filter', () => {
    instance.onChangeFilterInput(0, 'Query without result');
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Handle error response', () => {
    instance.handleError(404);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Unmounting component', () => {
    instance.componentWillUnmount();
    expect(notificationService.unsubscribe).toHaveBeenCalledTimes(2);
});