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
        const prodId = parseInt(this.props.params.productID, 10);
        this.state = {
            filter: [{id: 'filter-0', value: ''}],
            lastFilterId: 0,
            product: this.props.dataSource.receiveProduct(prodId),
            eventTypes: this.props.dataSource.receiveEventTypesOf(prodId),
            eventTable: {
                header: [],
                events: []
            }
        };
        this.changeFilterValue = this.changeFilterValue.bind(this);
        this.loadEventsFor = this.loadEventsFor.bind(this);
    }

    changeFilterValue(currentFilterId, value) {
        let changedState = { filter: this.state.filter };
        if(currentFilterId === this.state.lastFilterId) {
            const newFilterId = this.state.lastFilterId + 1;
            const newFilter = {id: `filter-${newFilterId}`, value: ''};
            changedState = { filter: this.state.filter.concat([newFilter]), lastFilterId: newFilterId };
        }
        changedState.filter[currentFilterId].value = value;
        this.setState( changedState );
    }

    loadEventsFor(eventType) {
        const events = this.props.dataSource.receiveEventsOf(this.state.product.id, eventType.id);
        const eventTable = { header: eventType.attributes, events: events };
        this.setState({ eventTable: eventTable });
    }

    render() {
        return (
            <div>
                <Header product={this.state.product}/>
                <DetailArea product={this.state.product}/>
                <Filterbar changeFilterValue={this.changeFilterValue} filter={this.state.filter}/>
                <Tabbar eventTypes={this.state.eventTypes} loadEventsfor={this.loadEventsFor} product={this.state.product}/>
                <EventTable eventTable={this.state.eventTable} filter={this.state.filter}/>
            </div>
        );
    }
}

export default ProductView;
