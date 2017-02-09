import React from 'react';
import ProductCardGrid from '../DashboardView/ProductCardGrid/ProductCardGrid.js';
import renderer from 'react-test-renderer';
import TestData from './testData/products.js'
let instance;

test("Correct drawing of ProductCardGrid", () => {
    const component = renderer.create(
        <ProductCardGrid
            ref={(child) => {instance = child}}
            products={TestData.PRODUCTS}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Correct search of products", () => {
    let testResult = instance.searchMatches(TestData.PRODUCTS[0], TestData.PRODUCTS[0].name);
    expect(testResult).toEqual(true);
    testResult = instance.searchMatches(TestData.PRODUCTS[0], "Something unreal: #+343");
    expect(testResult).toEqual(false);
});