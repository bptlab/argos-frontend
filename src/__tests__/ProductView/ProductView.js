import React from 'react';
import ProductView from '../../ProductView/ProductView.js';
import renderer from 'react-test-renderer';
import TestProduct from './../testData/product.js'
import TestEventTypes from '../testData/frontend_eventTypes.js'
import TestEvents from '../testData/frontend_events.js'

let instance, notificationService, component;

beforeEach(() => {
    const fetchProductMockCallback = jest.fn();
    const fetchEventTypesOfMockCallback = jest.fn();
    const fetchEventsOfMockCallback = (prodId, eventTypeId, succCallback) => {
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
    instance.handleProductData(TestProduct.PRODUCT);
    instance.handleEventTypeData(TestEventTypes.EVENTTYPES);
});

test("Rendering of ProductView", () => {
    const fetchProductMockCallback = jest.fn();
    const fetchEventTypesOfMockCallback = jest.fn();
    const fetchEventsOfMockCallback = (prodId, eventTypeId, succCallback) => {
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

test('Successful filtering', () => {
    instance.onInputChange(0, 'Product');
    expect(instance.state.filter[0].value).toBe("Product");
    expect(instance.state.filter[0].column).toBeNull();
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Changing active Tab', () => {
    instance.setActiveEventType(TestEventTypes.EVENTTYPES[0]);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Change filter', () => {
    instance.onInputChange(0, 'columnName:Product');
    expect(instance.state.filter[0].value).toBe("Product");
    expect(instance.state.filter[0].column).toBe("columnName");
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Add filter', () => {
    expect(instance.state.filter.length).toEqual(1);
    instance.onInputChange(0, 'Test');
    expect(instance.state.filter.length).toEqual(2);
});

test('Modify filter which is not the latest one', () => {
    instance.onInputChange(0, 'Test1');
    instance.onInputChange(1, 'Test2');
    expect(instance.state.filter[1].value).toEqual("Test2");
    instance.onInputChange(2, 'Test3');
    instance.onInputChange(1, 'new Value');
    expect(instance.state.filter[1].value).toEqual("new Value");
});

test('Remove last filter', () => {
    expect(instance.state.filter.length).toEqual(1);
    instance.onInputChange(0, 'Test');
    expect(instance.state.filter.length).toEqual(2);

    instance.onInputChange(0, '');
    expect(instance.state.filter.length).toEqual(1);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Remove intermediate filter', () => {
    expect(instance.state.filter.length).toEqual(1);
    instance.onInputChange(0, 'Test');
    expect(instance.state.filter.length).toEqual(2);
    instance.onInputChange(1, 'Test2');
    expect(instance.state.filter.length).toEqual(3);

    instance.onInputChange(0, '');
    expect(instance.state.filter.length).toEqual(2);
    expect(instance.state.filter[0].value).toEqual('Test2');
    expect(instance.state.filter[1].value).toEqual('');
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
