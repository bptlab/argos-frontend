import React from 'react';
import DashboardView from '../DashboardView/DashboardView.js';
import renderer from 'react-test-renderer';
import TestData from './testData/products.js'
let instance, component;

test("Correct drawing of DashboardView", () => {
    component = renderer.create(
        <DashboardView
            ref={(child) => {instance = child}}
            dataSource={{fetchProducts: function() {return true;}}}/>
    );
    instance.handleProductData(TestData.PRODUCTS);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Error handling", () => {
    const errorCode = "An test-error occured";
    instance.handleError(errorCode);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Add a state to exclude from view", () => {
    instance.handleExcludeStateInput("RUNNING");
    expect(instance.state.excludedStates[0]).toEqual("RUNNING");
    instance.handleExcludeStateInput("RUNNING");
    expect(instance.state.excludedStates.length).toEqual(0);
});

test("Search in Searchbar", () => {
    instance.handleSearchInput("ProductDescription with Error");
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});