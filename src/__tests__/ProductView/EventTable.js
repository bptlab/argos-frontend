import React from 'react';
import EventTable from '../../ProductView/EventTable/EventTable.js';
import renderer from 'react-test-renderer';
import TestEventTable from './../testData/eventTable.js';
let instance;

test("Rendering of EventTable", () => {
    const mockFilter = {id: 'mock-filter', value: '200'};
    const component = renderer.create(
        <EventTable ref={(child) => {instance = child}}
                    eventTable={TestEventTable.EVENTTABLE}
                    filter={[mockFilter]}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});