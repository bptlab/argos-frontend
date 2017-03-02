import React from 'react';
import ProductCardHeader from '../DashboardView/ProductCardGrid/ProductCard/ProductCardHeader/ProductCardHeader.js';
import renderer from 'react-test-renderer';

test('Render DashboardView Header', () => {
    const component = renderer.create(
        <ProductCardHeader category="WARNING">Name of Product</ProductCardHeader>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});