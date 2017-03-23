import React, { Component } from 'react';
import Header from './Header/Header.js';
import DetailArea from './DetailArea/DetailArea.js';
import FilterBar from './FilterBar/FilterBar.js';
import TabBar from './TabBar/TabBar.js';
import EventTable from './EventTable/EventTable.js';
import Loader from './../Loader/Loader.js';
import LineChart from './Diagram/LineChart.js';

class ProductView extends Component {
    constructor(props) {
        super(props);
        this.prodId = parseInt(this.props.params.productID, 10);
        this.state = {
            filter: [{id: 'filter-0', value: '', column: null}],
            lastFilterId: 0,
            product: null,
            eventTypes: null,
            error: null,
            activeEventType: {attributes: []},
            eventData: []
        };
        //Function binding
        this.onChangeFilterInput = this.onChangeFilterInput.bind(this);
        this.handleProductData = this.handleProductData.bind(this);
        this.handleEventData = this.handleEventData.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleEventTypeData = this.handleEventTypeData.bind(this);
        this.fetchProducts = this.fetchProducts.bind(this);
        this.fetchEventTypes = this.fetchEventTypes.bind(this);
        this.fetchEventsFor = this.fetchEventsFor.bind(this);
        this.setActiveEventType = this.setActiveEventType.bind(this);
    }

    handleEventData(eventType, events) {
        let eventContainer = this.state.eventData.find((eventContainer) => {
           return eventContainer.eventType === eventType;
        });
        const eventData = this.state.eventData;
        if(eventContainer) {
            const index = this.state.eventData.indexOf(eventContainer);
            eventContainer.events = events;
            eventData.splice(index, 1);
        } else {
            eventContainer = {
                eventType: eventType,
                events: events
            };
        }
        eventData.push(eventContainer);
        this.setState({eventData: eventData});
    }

    handleEventTypeData(eventTypes) {
        this.setState({
            eventTypes: eventTypes
        });
        eventTypes.forEach((eventType) => {
            this.fetchEventsFor(eventType);
        }, this);
    }

    componentDidMount() {
        this.fetchProducts();
        this.props.dataSource.notificationService.subscribe("Product", this.fetchProducts);
        this.props.dataSource.notificationService.subscribe("EventType", this.fetchEventTypes);
        this.props.dataSource.notificationService.subscribe("Event", this.fetchEventsFor);
    }
    

    componentWillUnmount() {
        this.props.dataSource.notificationService.unsubscribe("Product", this.fetchProducts);
        this.props.dataSource.notificationService.unsubscribe("EventType", this.fetchEventTypes);
    }

    fetchProducts() {
        this.props.dataSource.fetchProduct(this.prodId, this.handleProductData, this.handleError);
    }
    
    fetchEventTypes() {
        this.props.dataSource.fetchEventTypesOf(this.prodId, this.handleEventTypeData, this.handleError);
    }

    fetchEventsFor(eventType = this.state.activeEventType) {
        if(eventType) {
            this.props.dataSource.fetchEventsOf(
                this.prodId,
                eventType.id,
                (events) => {this.handleEventData(eventType, events);},
                this.handleError
            );
        }
    }

    handleProductData(products) {
        this.setState({
            product: products
        });
        this.fetchEventTypes();
    }

    handleError(errorCode) {
        this.setState({
            error: errorCode
        });
    }

    onChangeFilterInput(currentFilterId, value) {
        const updatedFilters = this.state.filter;
        const separatorPosition = value.indexOf(":");
        if(separatorPosition > 0 && separatorPosition < value.length - 1) {
          updatedFilters[currentFilterId].column = value.substr(0, separatorPosition);
          updatedFilters[currentFilterId].value = value.substr(separatorPosition+1);
        }
        else {
          updatedFilters[currentFilterId].column = null;
          updatedFilters[currentFilterId].value = value;
        }

        if(currentFilterId === this.state.lastFilterId) {
            const newFilterId = this.state.lastFilterId + 1;
            const newFilter = {id: `filter-${newFilterId}`, value: '', column: null};
            this.setState({
                filter: updatedFilters.concat([newFilter]),
                lastFilterId: newFilterId
            });
        }
        else {
            this.setState({filter: updatedFilters});
        }
    }
    
    setActiveEventType(eventType) {
        this.setState({activeEventType: eventType});
    }
    
    getCurrentEvents() {
        const eventContainer = this.state.eventData.find(function(eventContainer)  {
            return eventContainer.eventType === this.state.activeEventType;
        }, this );
        if(eventContainer) {
            return eventContainer.events;
        } else {
            return [];
        }
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
                    {this.state.activeEventType.attributes.length > 0 &&
                        <div>
                            <LineChart eventData={this.state.eventData}/>
                            <FilterBar
                                onChangeFilterInput={this.onChangeFilterInput}
                                filter={this.state.filter}/>
                        </div>}
                    }
                    <TabBar
                        eventTypes={this.state.eventTypes}
                        setActiveEventType={this.setActiveEventType}
                        product={this.state.product} />
                    <EventTable
                        header={this.state.activeEventType.attributes}
                        events={this.getCurrentEvents()}
                        filter={this.state.filter} />
                </div>
            );
        }
        return (<div>{component}</div>);
    }
} export default ProductView;