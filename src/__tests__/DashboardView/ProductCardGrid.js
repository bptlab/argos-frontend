import React from 'react';
import ProductCardGrid from '../../DashboardView/ProductCardGrid/ProductCardGrid.js';
import renderer from 'react-test-renderer';
import ProductData from '../testData/products.js';
import ProductFamilyData from '../testData/frontend_productFamilies';
let instance, component;

beforeEach(() => {
    component = renderer.create(
        <ProductCardGrid
            ref={(child) => {instance = child}}
            productFamilies={ProductFamilyData.PRODUCTFAMILIES}
            excludedStates={[]}/>
    );
});

test("Correct drawing of ProductCardGrid", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Correct drawing of ProductCardGrid in case of excluded state", () => {
    const component2 = renderer.create(
        <ProductCardGrid
            productFamilies={ProductFamilyData.PRODUCTFAMILIES}
            excludedStates={["WARNING"]}/>
    );
    const tree2 = component2.toJSON();
    expect(tree2).toMatchSnapshot();
});

test("Correct search of products", () => {
    let testResult = instance.searchMatches(ProductData.PRODUCTS[0], ProductData.PRODUCTS[0].name);
    expect(testResult).toEqual(true);
    testResult = instance.searchMatches(ProductData.PRODUCTS[0], "Something unreal: #+343");
    expect(testResult).toEqual(false);
});