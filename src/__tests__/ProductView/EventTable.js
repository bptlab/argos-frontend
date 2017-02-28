import React from 'react';
import EventTable from '../../ProductView/EventTable/EventTable.js';
import renderer from 'react-test-renderer';
import TestEvents from './../testData/events.js';
import TestEventTypes from './../testData/eventTypes';
let instance;

test("Rendering of EventTable", () => {
    const mockFilter = {id: 'mock-filter', value: '200'};
    const component = renderer.create(
        <EventTable ref={(child) => {instance = child}}
                    header={TestEventTypes.EVENTTYPES[0].attributes}
                    events={TestEvents.EVENTS}
                    filter={[mockFilter]}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});