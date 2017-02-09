import React, { Component } from 'react';
import './ProductView.css';
import Header from './Header/Header.js';
import DetailArea from './DetailArea/DetailArea.js';
import FilterBar from './Filterbar/FilterBar.js';
import TabBar from './Tabbar/TabBar.js';
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
        //Function binding
        this.onChangeFilterInput = this.onChangeFilterInput.bind(this);
        this.loadEventsFor = this.loadEventsFor.bind(this);
    }

    onChangeFilterInput(currentFilterId, value) {
        if(currentFilterId === this.state.lastFilterId) {
            const newFilterId = this.state.lastFilterId + 1;
            const newFilter = {id: `filter-${newFilterId}`, value: ''};
            this.setState({ 
                filter: this.state.filter.concat([newFilter]), 
                lastFilterId: newFilterId 
            });
        } else {
            const updatedFilters = this.state.filter;
            updatedFilters[currentFilterId].value = value;
            this.setState({filter: updatedFilters});
        }
    }

    loadEventsFor(eventType) {
        const events = this.props.dataSource.receiveEventsOf(this.state.product.id, eventType.id);
        const eventTable = { 
            header: eventType.attributes, 
            events: events 
        };
        this.setState({ eventTable: eventTable });
    }

    render() {
        return (
            <div>
                <Header product={this.state.product}/>
                <DetailArea product={this.state.product}/>
                <FilterBar
                    onChangeFilterInput={this.onChangeFilterInput}
                    filter={this.state.filter}/>
                <TabBar 
                    eventTypes={this.state.eventTypes} 
                    loadEventsFor={this.loadEventsFor} 
                    product={this.state.product}/>
                <EventTable 
                    eventTable={this.state.eventTable} 
                    filter={this.state.filter}/>
            </div>
        );
    }
} export default ProductView;
