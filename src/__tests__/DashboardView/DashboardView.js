import React from 'react';
import DashboardView from '../../DashboardView/DashboardView.js';
import renderer from 'react-test-renderer';
import TestData from '../testData/products.js'
import ProductFamilyData from '../testData/frontend_productFamilies'
let instance, component, notificationService;
const fetchProducts = jest.fn();
const fetchProductFamilies = jest.fn();

beforeEach(() => {
    notificationService = {
        subscribe: jest.fn(),
        unsubscribe: jest.fn()
    };
    component = renderer.create(
        <DashboardView
            ref={(child) => {instance = child}}
            dataSource={{
                notificationService: notificationService,
                fetchProducts: fetchProducts,
                fetchProductFamilies: fetchProductFamilies
            }}/>
    );
    instance.handleProductFamilyData(ProductFamilyData.PRODUCTFAMILIES);
});

test("Correct drawing of DashboardView", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(notificationService.subscribe).toBeCalled();
    expect(fetchProductFamilies).toBeCalledWith(instance.handleProductFamilyData, instance.handleError)
});

test("Error handling", () => {
    const errorCode = "An test-error occurred";
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

test("Search in SearchBar", () => {
    instance.handleSearchInput("ProductDescription with Error");
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Unmounting component", () => {
   instance.componentWillUnmount();
   expect(notificationService.subscribe).toBeCalled();
});