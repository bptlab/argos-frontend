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
        this.state = { filter: [{id: 'filter-0', value: ''}] };
        this.appendFilter = this.appendFilter.bind(this);
        this.changeFilterValue = this.changeFilterValue.bind(this);
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

    render() {
        const product = JSON.parse('{"numberOfDevices":83,"numberOfEvents":2001,"productionStart":"Feb 1, 2016 12:00:00 AM","state":"RUNNING","name":"example family","id":483, "metaData": {"label":"product label 002", "brand":"Testbrand2", "orderNumber":1234, "statusDescription":"everything is broken!"}}');
        const eventTypes = JSON.parse('[{"id":14,"name":"FirstEventType","numberOfEvents":3,"attributes":[{"name":"Name","type":"string"},{"name":"ErrorCode","type":"string"}]}, {"id":20,"name":"SecondEventType","numberOfEvents":1,"attributes":[{"name":"Name","type":"string"},{"name":"ErrorCode","type":"string"},{"name":"possible fix","type":"string"}]}]');
        return (
            <div>
                <Header product={product}/>
                <DetailArea product={product}/>
                <Filterbar filter={this.state.filter} add={this.appendFilter} changeFilterValue={this.changeFilterValue}/>
                <Tabbar eventTypes={eventTypes}/>
                <EventTable eventTypes={eventTypes}/>
            </div>
        );
    }
}

export default ProductView;
