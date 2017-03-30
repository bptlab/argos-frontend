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
            configuration: null,
            eventTypes: null,
            error: null,
            activeEventType: {attributes: []},
            activeEvents: [],
            showAllConfigurations: true,
            loading: true
        };
        this.nextAttributeId = 1;
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
        this.handleChangeProductConfiguration = this.handleChangeProductConfiguration.bind(this);
    }

    handleEventData(events) {
        this.setState({
            activeEvents: events
        });
    }

    handleEventTypeData(eventTypes) {
        this.setState({
            eventTypes: eventTypes,
            loading: false
        });
        if(eventTypes.length === 0) {
            this.handleEventData([]);
            this.setState({
                activeEventType: {attributes: []}
            });
        }
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
        this.props.dataSource.notificationService.unsubscribe("Event", this.fetchEventsFor);
    }

    fetchProduct() {
        this.props.dataSource.fetchProduct(this.prodId, this.handleProductData, this.handleError);
    }

    fetchConfiguration() {
        this.props.dataSource.fetchConfiguration(this.configurationId, this.handleConfigurationData, this.handleError);
    }

    fetchEventTypes() {
        this.props.dataSource.fetchEventTypesOf(this.getInstanceId(), this.handleEventTypeData, this.handleError, this.isProductRequested());
    }

    fetchEventsFor(eventType = this.state.activeEventType) {
        if(eventType) {
            this.props.dataSource.fetchEventsOf(
                this.getInstanceId(),
                eventType.id,
                this.handleEventData,
                this.handleError,
                this.isProductRequested()
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
        this.fetchEventTypes();
    }

    handleError(errorCode) {
        this.setState({
            error: errorCode
        });
    }

    isProductRequested() {
        return this.state.showAllConfigurations;
    }

    getInstanceId() {
        if(this.state.showAllConfigurations) {
            return this.prodId;
        }
        return this.configurationId;
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

    handleChangeProductConfiguration(configurationId) {
        this.setState({
            loading: true
        });
        if(configurationId) {
            this.setState({
                showAllConfigurations: false
            });
            this.configurationId = configurationId;
            this.fetchConfiguration();
        }
        else {
            this.setState({
                showAllConfigurations: true
            });
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
            let pageContent = (<Loader/>);
            if(!this.state.loading) {
                pageContent = (
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <DetailArea
                                    product={this.state.product}
                                    configuration={this.state.configuration}
                                    showAllConfigurations={this.state.showAllConfigurations}/>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <LineChart
                                    events={this.state.activeEvents}
                                    eventType={this.state.activeEventType}
                                    product={this.state.product} />
                            </div>
                            <div className="col-12">
                                <FilterBar
                                    onInputChange={this.onInputChange}
                                    filter={this.state.filter} />
                            </div>
                            <div className="col-12">
                                <TabBar
                                    dataSender={this.props.dataSender}
                                    eventTypes={this.state.eventTypes}
                                    setActiveEventType={this.setActiveEventType}
                                    product={this.state.product} />
                            </div>
                            <div className="col-12">
                                <EventTable
                                    header={this.state.activeEventType.attributes}
                                    events={this.state.activeEvents}
                                    filter={this.state.filter} />
                            </div>
                        </div>
                    </div>
                );
            }
            component = (
                <div>
                    <Header
                        product={this.state.product}
                        configurations={this.state.product.configurations}
                        onChangeProductConfiguration={this.handleChangeProductConfiguration}/>
                    {pageContent}
                </div>
            );
        }
        return (<div>{component}</div>);
    }
} export default ProductView;
