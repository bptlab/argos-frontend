import React from 'react';
import DashboardView from '../DashboardView/DashboardView.js';
import renderer from 'react-test-renderer';
import TestData from './testData/products.js'
let instance;

test("Correct drawing of DashboardView", () => {
    const component = renderer.create(
        <DashboardView
            ref={(child) => {instance = child}}
            dataSource={{fetchProducts: function() {return true;}}}/>
    );
    instance.handleProductData(TestData.PRODUCTS);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});