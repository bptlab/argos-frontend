import React, { Component } from 'react';
import Header from './Header/Header.js';
import DetailArea from './DetailArea/DetailArea.js';
import FilterBar from './FilterBar/FilterBar.js';
import TabBar from './TabBar/TabBar.js';
import EventTable from './EventTable/EventTable.js';
import Loader from './../Loader/Loader.js';

class ProductView extends Component {
    constructor(props) {
        super(props);
        this.prodId = parseInt(this.props.params.productID, 10);
        this.state = {
            filter: [{id: 'filter-0', value: ''}],
            lastFilterId: 0,
            product: null,
            eventTypes: null,
            error: null,
            eventTable: {
                header: [],
                events: []
            }
        };
        //Function binding
        this.onChangeFilterInput = this.onChangeFilterInput.bind(this);
        this.loadEventsFor = this.loadEventsFor.bind(this);
        this.handleProductData = this.handleProductData.bind(this);
        this.handleEventData = this.handleEventData.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleEventTypeData = this.handleEventTypeData.bind(this);
    }
    componentDidMount() {
        this.props.dataSource.fetchProduct(this.prodId, this.handleProductData, this.handleError);
    }

    handleEventData(events) {
        const eventTable = {
            header: this.activeEventType.attributes,
            events: events
        };
        this.setState({ eventTable: eventTable });
    }

    handleEventTypeData(eventTypes) {
        this.setState({
            eventTypes: eventTypes
        });
    }

    handleProductData(products) {
        this.setState({
            product: products
        });
        this.props.dataSource.fetchEventTypesOf(this.prodId, this.handleEventTypeData, this.handleError);
    }

    handleError(errorCode) {
        this.setState({
            error: errorCode
        });
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
        this.activeEventType = eventType;
        this.props.dataSource.fetchEventsOf(
            this.state.product.id, 
            eventType.id, 
            this.handleEventData,
            this.handleError
        );
    }

    render() {
        let component = (<Loader/>);
        if(this.state.error) {
            component = (
                <div className="critical-error">
                    <i className="fa fa-exclamation-triangle warning-sign"/>
                    <p>{this.state.error}</p>
                </div>
            );
        } else if(this.state.product && this.state.eventTypes) {
            component = (
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
        return (<div>{component}</div>);
    }
} export default ProductView;