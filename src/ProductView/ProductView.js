import React, { Component } from 'react';
import './ProductView.css';
import Header from './Header/Header.js';
import DetailArea from './DetailArea/DetailArea.js';
import Filterbar from './Filterbar/Filterbar.js';
import Tabbar from './Tabbar/Tabbar.js';
import EventTable from './EventTable/EventTable.js';

class ProductView extends Component {
    constructor(props) {
        super(props);
        this.state = { filter: [{id: 'filter-0', value: ''}], eventTable: {header: [], events: []}};
        this.appendFilter = this.appendFilter.bind(this);
        this.changeFilterValue = this.changeFilterValue.bind(this);
        this.loadEventsfor = this.loadEventsfor.bind(this);
    }

    appendFilter() {
        var newFilter = {id: `filter-${this.state.filter.length}`, value: ''};
        this.setState({ filter: this.state.filter.concat([newFilter]) });
    }

    changeFilterValue(id, value) {
        if(id === (this.state.filter.length - 1)) {
            this.appendFilter();
        }
        var newState = this.state;
        newState.filter[id].value = value;
        this.setState( newState );
    }

    loadEventsfor(eventType) {
        var events = [];
        if(eventType.id === 14) {
            events = JSON.parse('[{"Name":"Test1", "ErrorCode":"200"}, {"Name":"Test15", "ErrorCode":"404"}, {"Name":"Test12", "ErrorCode":"201"}]');
        }
        else {
            events = JSON.parse('[{"Name":"Test11", "ErrorCode":"404", "possible fix": "Do something!"}, {"Name":"Test133", "ErrorCode":"808", "possible fix": "Do something FAST!"}, {"Name":"Test40", "ErrorCode":"666", "possible fix": "RUN!!!"}]');
        }
        var eventTable = { header: eventType.attributes, events: events };
        this.setState({ eventTable: eventTable });
    }

    render() {
        const product = JSON.parse('{"numberOfDevices":83,"numberOfEvents":2001,"productionStart":"Feb 1, 2016 12:00:00 AM","state":"RUNNING","name":"example family","id":483, "metaData": {"label":"product label 002", "brand":"Testbrand2", "orderNumber":1234, "statusDescription":"everything is broken!"}}');
        const eventTypes = JSON.parse('[{"id":14,"name":"FirstEventType","numberOfEvents":3,"attributes":[{"name":"Name","type":"string"},{"name":"ErrorCode","type":"string"}]}, {"id":20,"name":"SecondEventType","numberOfEvents":1,"attributes":[{"name":"Name","type":"string"},{"name":"ErrorCode","type":"string"},{"name":"possible fix","type":"string"}]}]');
        return (
            <div>
                <Header product={product}/>
                <DetailArea product={product}/>
                <Filterbar filter={this.state.filter} add={this.appendFilter} changeFilterValue={this.changeFilterValue}/>
                <Tabbar eventTypes={eventTypes} loadEventsfor={this.loadEventsfor}/>
                <EventTable eventTable={this.state.eventTable}/>
            </div>
        );
    }
}

export default ProductView;
