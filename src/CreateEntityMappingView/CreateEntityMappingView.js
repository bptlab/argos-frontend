import React from 'react';
import {connect, PromiseState} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import {Col, Container, Row} from "react-grid-system";
import {MenuItem, RaisedButton, SelectField} from "material-ui";
import IconSave from "material-ui/svg-icons/content/save";
import IconCancel from "material-ui/svg-icons/navigation/cancel";
import IconAdd from "material-ui/svg-icons/content/add";
import Header from './../Header';
import { css } from 'aphrodite';

import config from "../config/config";
import AppStyles from "../AppStyles";

class CreateEntityMappingView extends ConnectionComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedEventTypeId: null,
            selectedEntityTypeId: null,
            mappings: CreateEntityMappingView.getDefaultMappings(),
            numberOfMappings: 0
        };
        this.handleEventTypeChange = this.handleEventTypeChange.bind(this);
        this.handleEntityTypeChange = this.handleEntityTypeChange.bind(this);
    }

    static getDefaultMappings() {
        return [{eventTypeAttribute: null, entityTypeAttribute: null}];
    }

    getAllEntityTypes(hierarchy) {
        if (hierarchy) {
            let allEntities = [];
            hierarchy.forEach((hierarchyLayer) => {
                hierarchyLayer.forEach((entityType) => {
                    allEntities = allEntities.concat(entityType);
                });
            });
            return allEntities;
        }
        return [];
    }

    handleEventTypeChange(event, index, value) {
        this.setState({
            selectedEventTypeId: value,
            mappings: CreateEntityMappingView.getDefaultMappings()
        });
        this.props.lazyEventTypeAttributeLoading(value);
    }

    handleEntityTypeChange(event, index, value) {
        this.setState({
            selectedEntityTypeId: value,
            mappings: CreateEntityMappingView.getDefaultMappings()
        });
        this.props.lazyEntityTypeAttributeLoading(value);
    }

    getEventTypeAttributesDropdown(currentNumberOfMappings) {
        const eventTypeAttributes = this.props.eventTypeAttributes.value;

        return (<SelectField
            floatingLabelText="Select Event Type Attribute"
            fullWidth={true}
            value={this.state.mappings[currentNumberOfMappings].eventTypeAttribute}
            onChange={
                (event, index, value) => {
                    let mappings = this.state.mappings;
                    mappings[currentNumberOfMappings].eventTypeAttribute = value;
                    this.setState({mappings});
                }}>
            {eventTypeAttributes.map(
                (eventTypeAttribute, key) => {
                    return <MenuItem
                        key={key}
                        value={eventTypeAttribute.Id}
                        primaryText={eventTypeAttribute.Name}/>;
                })
            }
        </SelectField>);
    }

    getEntityTypeAttributesDropdown(currentNumberOfMappings) {
        const entityTypeAttributes = this.props.entityTypeAttributes.value;

        return (<SelectField
            floatingLabelText="Select Entity Type Attribute"
            fullWidth={true}
            value={this.state.mappings[currentNumberOfMappings].entityTypeAttribute}
            onChange={
                (event, index, value) => {
                    let mappings = this.state.mappings;
                    mappings[currentNumberOfMappings].entityTypeAttribute = value;
                    this.setState({mappings});
                }
            }>
            {entityTypeAttributes.map(
                (entityTypeAttribute, key) => {
                    return <MenuItem
                        key={key}
                        value={entityTypeAttribute.Id}
                        primaryText={entityTypeAttribute.Name}/>;
                })
            }
        </SelectField>);
    }

    loadAttributes() {
        const attributesFetchingIncomplete = super.render(PromiseState.all(this.props.entityTypeAttributes, this.props.eventTypeAttributes));
        if (attributesFetchingIncomplete) {
            return attributesFetchingIncomplete;
        }
        const currentNumberOfMappings = this.state.numberOfMappings;
        return (
            <Row>
                <Col md={5}>
                    {this.getEventTypeAttributesDropdown(currentNumberOfMappings)}
                </Col>
                <Col md={5}>
                    {this.getEntityTypeAttributesDropdown(currentNumberOfMappings)}
                </Col>
                <Col md={2}>
                    <RaisedButton label="Add Mapping"><IconAdd/></RaisedButton>
                </Col>
            </Row>
        );
    }

    render() {
        const allFetches = PromiseState.all([this.props.eventTypes, this.props.entityTypeHierarchy]);
        const eventTypes = this.props.eventTypes.value;
        const entityTypes = this.getAllEntityTypes(this.props.entityTypeHierarchy.value);
        const connectionIncomplete = super.render(allFetches);
        if(connectionIncomplete) {
            return connectionIncomplete;
        }
        let attributeFields = "";
        if (this.props.eventTypeAttributes && this.props.entityTypeAttributes) {
            attributeFields = this.loadAttributes();
        }
        return (
            <div>
                <Header title={"Create Entity Mapping"}/>
                <div className={AppStyles.elementMarginTop}>
                    <Container>
                        <Row>
                            <Col md={6}>
                                <SelectField
                                    value={this.state.selectedEventTypeId}
                                    onChange={this.handleEventTypeChange}
                                    floatingLabelText="Select Event Type"
                                    fullWidth={true}>
                                    {eventTypes.map(
                                        (eventType, key) => {
                                            return <MenuItem
                                                        key={key}
                                                        value={eventType.Id}
                                                        primaryText={eventType.Name}/>;
                                        })
                                    }
                                </SelectField>
                            </Col>
                            <Col md={6}>
                                <SelectField
                                    value={this.state.selectedEntityTypeId}
                                    onChange={this.handleEntityTypeChange}
                                    floatingLabelText="Select Entity Type"
                                    fullWidth={true}>
                                    {entityTypes.map(
                                        (entityType, key) => {
                                            return <MenuItem
                                                key={key}
                                                value={entityType.Id}
                                                primaryText={entityType.Name}/>;
                                        })
                                    }
                                </SelectField>
                            </Col>
                        </Row>
                        {attributeFields}
                        <div className={css(AppStyles.textAlignCenter)}>
                            <RaisedButton
                                label="Abort"
                                icon={<IconCancel/>}
                                className={css(AppStyles.marginAllSites)}
                                secondary={true}
                            />
                            <RaisedButton
                                label="Save"
                                icon={<IconSave/>}
                                className={css(AppStyles.marginAllSites)}
                                primary={true}
                            />
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
    eventTypes:  config.backendRESTRoute + `/eventtypes`,
    entityTypeHierarchy: config.backendRESTRoute + `/entitytype/hierarchy`,
    lazyEventTypeAttributeLoading: eventTypeId => ({
        eventTypeAttributes: config.backendRESTRoute + `/eventtype/${eventTypeId}/attributes`
    }),
    lazyEntityTypeAttributeLoading: entityTypeId => ({
        entityTypeAttributes: config.backendRESTRoute + `/entityType/${entityTypeId}/attributes`
    }),
}))(CreateEntityMappingView);
