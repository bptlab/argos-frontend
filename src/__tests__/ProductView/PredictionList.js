import React from 'react';
import PredictionList from '../../ProductView/PredictionList/PredictionList.js';
import renderer from 'react-test-renderer';
import testConfigurations from '../testData/frontend_configurations.js';


test('Render PredictionList', () => {
    const component = renderer.create(
        <PredictionList
            configuration={testConfigurations.CONFIGURATIONS[0]}
            showAllConfigurations={false} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render PredictionList without content', () => {
    const component = renderer.create(
        <PredictionList
            configuration={testConfigurations.CONFIGURATIONS[0]}
            showAllConfigurations={false} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});