import React from 'react';
import ProductView from '../ProductView/ProductView.js';
import renderer from 'react-test-renderer';
import TestProduct from './testData/product.js'
import TestEventTypes from './testData/eventTypes.js'
import TestEvents from './testData/events.js'
let instance;

test("Correct drawing of ProductView", () => {
    const component = renderer.create(
        <ProductView
            ref={(child) => {instance = child}}
            dataSource={{fetchProduct: function() {return true;}, fetchEventTypesOf: function() {return true;}, fetchEventsOf: function() {return true;}}}
            params={{productId: 0}}/>
    );
    instance.handleProductData(TestProduct.PRODUCT);
    instance.handleEventTypeData(TestEventTypes.EVENTTYPES);
    instance.activeEventType = TestEventTypes.EVENTTYPES[0];
    instance.handleEventData(TestEvents.EVENTS);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});