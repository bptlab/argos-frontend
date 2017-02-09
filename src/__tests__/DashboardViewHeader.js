import React from 'react';
import Header from '../DashboardView/Header/Header.js';
import renderer from 'react-test-renderer';

test('Render DashboardView Header', () => {
    const component = renderer.create(
        <Header />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});