import React from 'react';
import LineChart from '../../ProductView/Diagram/LineChart.js';
import renderer from 'react-test-renderer';
import TestDataEvents from '../testData/frontend_events.js'
import TestDataEventTypes from '../testData/frontend_eventTypes.js'

test("Correct drawing of LineChart", () => {
    const component = renderer.create(
        <LineChart
            eventData={{
                eventType: TestDataEventTypes.EVENTTYPES[0],
                events: TestDataEvents.EVENTS
            }}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});