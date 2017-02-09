import React from 'react';
import ProductCard from '../DashboardView/ProductCardGrid/ProductCard/ProductCard.js';
import TestData from './testData/products';
import renderer from 'react-test-renderer';

test('Render DashboardView Header', () => {
    const component = renderer.create(
        <ProductCard product={TestData.PRODUCTS[0]} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});