import React from 'react';
import {connect, PromiseState} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import {Col, Container, Row} from "react-grid-system";
import {FlatButton, IconButton, MenuItem, RaisedButton, SelectField} from "material-ui";
import IconSave from "material-ui/svg-icons/content/save";
import IconCancel from "material-ui/svg-icons/navigation/cancel";
import IconAdd from "material-ui/svg-icons/content/add";
import IconDelete from "material-ui/svg-icons/action/delete";
import Header from './../Header';
import { css } from 'aphrodite';

import config from "../config/config";
import AppStyles from "../AppStyles";
import LoadingAnimation from "../Utils/LoadingAnimation";

class CreateEntityMappingView extends ConnectionComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedEventTypeId: null,
            selectedEntityTypeId: null,
            mappings: CreateEntityMappingView.getDefaultMappings()
        };
        this.handleEventTypeChange = this.handleEventTypeChange.bind(this);
        this.handleEntityTypeChange = this.handleEntityTypeChange.bind(this);
        this.handleAddNewMappingCondition = this.handleAddNewMappingCondition.bind(this);
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

    handleAddNewMappingCondition() {
        let mappings = this.state.mappings;
        mappings[this.state.mappings.length] = {entityTypeAttribute: null, eventTypeAttribute: null};
        this.setState({mappings});
    }

    getEventTypeAttributesDropdown(key, value) {
        const eventTypeAttributes = this.props.eventTypeAttributes.value;
        if (eventTypeAttributes) {
            return (<SelectField
                floatingLabelText="Select Event Type Attribute"
                fullWidth={true}
                value={value}
                onChange={
                    (event, index, value) => {
                        let mappings = this.state.mappings;
                        mappings[key].eventTypeAttribute = value;
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
        return <LoadingAnimation/>;
    }

    getEntityTypeAttributesDropdown(key, value) {
        const entityTypeAttributes = this.props.entityTypeAttributes.value;
        if (entityTypeAttributes) {
            return (<SelectField
                floatingLabelText="Select Entity Type Attribute"
                fullWidth={true}
                value={value}
                onChange={
                    (event, index, value) => {
                        let mappings = this.state.mappings;
                        mappings[key].entityTypeAttribute = value;
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
        return <LoadingAnimation/>;
    }

    loadAttributes() {
        const attributesFetchingIncomplete = super.render(PromiseState.all(this.props.entityTypeAttributes, this.props.eventTypeAttributes));
        if (attributesFetchingIncomplete) {
            return attributesFetchingIncomplete;
        }
        let content = [];
        this.state.mappings.forEach((mapping, key) => {
                content.push(
                    <Row key={key}>
                        <Col md={6}>
                            {this.getEventTypeAttributesDropdown(key, mapping.eventTypeAttribute)}
                        </Col>
                        <Col md={5}>
                            {this.getEntityTypeAttributesDropdown(key, mapping.entityTypeAttribute)}
                        </Col>
                        <Col md={1}>
                            <IconButton
                                children={<IconDelete/>}
                                tooltip={<span>Delete Mapping</span>}
                                onTouchTap={
                                    () => {
                                        let mappings = this.state.mappings;
                                        if (key === 0 && this.state.mappings.length === 1) {
                                            mappings = CreateEntityMappingView.getDefaultMappings();
                                        } else {
                                            mappings.splice(key, 1);
                                        }
                                        this.setState({mappings});
                                    }
                                }
                            />
                        </Col>
                    </Row>);
        });
        return (
            <div>
                {content}
                <FlatButton
                    label="Add Mapping Condition"
                    onTouchTap={this.handleAddNewMappingCondition}
                    icon={<IconAdd/>}/>
            </div>);
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
