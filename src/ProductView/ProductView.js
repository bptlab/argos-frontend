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
            filter: [{id: '0', value: '', column: null}],
            lastFilterId: 0,
            product: null,
            eventTypes: null,
            error: null,
            activeEventType: {attributes: []},
            activeEvents: []
        };
        this.nextAttributeId = 1;
        this.showAllConfigurations = true;
        //Function binding
        this.onInputChange = this.onInputChange.bind(this);
        this.handleProductData = this.handleProductData.bind(this);
        this.handleConfigurationData = this.handleConfigurationData.bind(this);
        this.handleEventData = this.handleEventData.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleEventTypeData = this.handleEventTypeData.bind(this);
        this.fetchProduct = this.fetchProduct.bind(this);
        this.fetchConfiguration = this.fetchConfiguration.bind(this);
        this.fetchEventTypes = this.fetchEventTypes.bind(this);
        this.fetchEventsFor = this.fetchEventsFor.bind(this);
        this.setActiveEventType = this.setActiveEventType.bind(this);
        this.setProductConfiguration = this.setProductConfiguration.bind(this);
    }

    handleEventData(events) {
        this.setState({activeEvents: events});
    }

    handleEventTypeData(eventTypes) {
        this.setState({
            eventTypes: eventTypes
        });
    }

    componentDidMount() {
        this.fetchProduct();
        this.props.dataSource.notificationService.subscribe("Product", this.fetchProduct);
        this.props.dataSource.notificationService.subscribe("Configuration", this.fetchConfiguration);
        this.props.dataSource.notificationService.subscribe("EventType", this.fetchEventTypes);
        this.props.dataSource.notificationService.subscribe("Event", this.fetchEventsFor);
    }

    componentWillUnmount() {
        this.props.dataSource.notificationService.unsubscribe("Product", this.fetchProduct);
        this.props.dataSource.notificationService.unsubscribe("Configuration", this.fetchConfiguration);
        this.props.dataSource.notificationService.unsubscribe("EventType", this.fetchEventTypes);
    }

    fetchProduct() {
        console.log(this.prodId);
        this.props.dataSource.fetchProduct(this.prodId, this.handleProductData, this.handleError);
    }

    fetchConfiguration() {
        this.props.dataSource.fetchConfiguration(this.configurationId, this.handleConfigurationData, this.handleError);
    }

    fetchEventTypes() {
        if(this.showAllConfigurations) {
            this.props.dataSource.fetchEventTypesOf(this.prodId, this.handleEventTypeData, this.handleError);
        }
        else {
            this.props.dataSource.fetchEventTypesOf(this.configurationId, this.handleEventTypeData, this.handleError);
        }
    }

    fetchEventsFor(eventType = this.state.activeEventType) {
        if(eventType) {
            this.props.dataSource.fetchEventsOf(
                this.prodId,
                eventType.id,
                this.handleEventData,
                this.handleError
            );
        }
    }

    handleProductData(product) {
        this.setState({
            product: product
        });
        this.fetchEventTypes();
    }

    handleConfigurationData(configuration) {
        this.setState({
            configuration: configuration
        });
        // this.fetchEventTypes();
    }

    handleError(errorCode) {
        this.setState({
            error: errorCode
        });
    }

    onInputChange(currentFilterId, value) {
        const updatedFilters = this.state.filter;
        const filterIds = updatedFilters.map(function(filter){return filter.id;});
        const currentFilterIndex = filterIds.indexOf(currentFilterId.toString());

        if (!value) {
            updatedFilters.splice(currentFilterIndex, 1);
            this.setState({filter: updatedFilters});
            return;
        }
        const separatorPosition = value.indexOf(":");
        if(separatorPosition > 0 && separatorPosition < value.length - 1) {
          updatedFilters[currentFilterIndex].column = value.substr(0, separatorPosition);
          updatedFilters[currentFilterIndex].value = value.substr(separatorPosition+1);
        }
        else {
          updatedFilters[currentFilterIndex].column = null;
          updatedFilters[currentFilterIndex].value = value;
        }

        if(parseInt(currentFilterId) === this.state.lastFilterId) {
            const newFilterId = this.nextAttributeId;
            this.nextAttributeId += 1;
            const newFilter = {id: `${newFilterId}`, value: '', column: null};
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
        this.fetchEventsFor(eventType);
        this.setState({activeEventType: eventType});
    }

    setProductConfiguration(configurationId) {
        if(configurationId) {
            this.showAllConfigurations = false;
            this.configurationId = configurationId;
            this.fetchConfiguration();
        }
        else {
            this.showAllConfigurations = true;
            this.fetchProduct();
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
                    <Header product={this.state.product} configurations={this.state.product.configurations} setProductConfiguration={this.setProductConfiguration}/>
                    <DetailArea product={this.state.product}/>
                    <LineChart
                        events={this.state.activeEvents}
                        eventType={this.state.activeEventType} />
                    <FilterBar
                        onInputChange={this.onInputChange}
                        filter={this.state.filter} />
                    <TabBar
                        dataSender={this.props.dataSender}
                        eventTypes={this.state.eventTypes}
                        setActiveEventType={this.setActiveEventType}
                        product={this.state.product} />
                    <EventTable
                        header={this.state.activeEventType.attributes}
                        events={this.state.activeEvents}
                        filter={this.state.filter} />
                </div>
            );
        }
        return (<div>{component}</div>);
    }
} export default ProductView;
