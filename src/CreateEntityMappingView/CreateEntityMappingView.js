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
        this.handleEventTypeAttributeChange = this.handleEventTypeAttributeChange.bind(this);
        this.handleEntityTypeAttributeChange = this.handleEntityTypeAttributeChange.bind(this);
        this.prepareMappingsForSending = this.prepareMappingsForSending.bind(this);
    }

    static getDefaultMappings() {
        return [{eventTypeAttribute: null, entityTypeAttribute: null}];
    }

    static getMenuItems(items) {
        return items.map(
            (item, key) => {
                return <MenuItem
                    key={key}
                    value={item.Id}
                    primaryText={item.Name}/>;
            });
    }

    transformHierarchy(hierarchy) {
        //takes hierarchy and returns a list of all entities in this hierarchy ordered by name
        if (hierarchy) {
            let allEntities = [];
            hierarchy.forEach((hierarchyLayer) => {
                hierarchyLayer.forEach((entityType) => {
                    allEntities = allEntities.concat(entityType);
                });
            });
            allEntities.sort((a,b) => {
                return a.Name > b.Name;
            });
            return allEntities;
        }
        return [];
    }

    handleEventTypeChange(selectedEventTypeId) {
        this.setState({
            selectedEventTypeId: selectedEventTypeId,
            mappings: CreateEntityMappingView.getDefaultMappings()
        });
        this.props.lazyEventTypeAttributeLoading(selectedEventTypeId);
    }

    handleEntityTypeChange(selectedEntityTypeId) {
        this.setState({
            selectedEntityTypeId: selectedEntityTypeId,
            mappings: CreateEntityMappingView.getDefaultMappings()
        });
        this.props.lazyEntityTypeAttributeLoading(selectedEntityTypeId);
    }

    handleAddNewMappingCondition() {
        let mappings = this.state.mappings;
        mappings[this.state.mappings.length] = {entityTypeAttribute: null, eventTypeAttribute: null};
        this.setState({mappings});
    }

    handleEventTypeAttributeChange(key, eventTypeAttribute) {
        let mappings = this.state.mappings;
        mappings[key].eventTypeAttribute = eventTypeAttribute;
        this.setState({mappings});
    }

    handleEntityTypeAttributeChange(key, entityTypeAttribute) {
        let mappings = this.state.mappings;
        mappings[key].entityTypeAttribute = entityTypeAttribute;
        this.setState({mappings});
    }

    getEventTypeAttributesDropDown(key, selectedEventTypeAttribute) {
        const eventTypeAttributes = this.props.eventTypeAttributes.value;
        if (eventTypeAttributes) {
            return (<SelectField
                floatingLabelText="Select Event Type Attribute"
                fullWidth={true}
                value={selectedEventTypeAttribute}
                onChange={(event, index, value) => {this.handleEventTypeAttributeChange(key, value);}}>
                {CreateEntityMappingView.getMenuItems(eventTypeAttributes)}
            </SelectField>);
        }
        return <LoadingAnimation/>;
    }

    prepareMappingsForSending() {
        //must be called before saving the data
        let mappings = this.state.mappings;
        let cleanedMappings = [];
        mappings.forEach((mapping) => {
            if (mapping.eventTypeAttribute && mapping.entityTypeAttribute) {
                cleanedMappings.push(mapping);
            }
        });
        console.log(cleanedMappings);
        return cleanedMappings;
    }


    getEntityTypeAttributesDropDown(key, selectedEntityTypeAttribute) {
        const entityTypeAttributes = this.props.entityTypeAttributes.value;
        if (entityTypeAttributes) {
            return (<SelectField
                floatingLabelText="Select Entity Type Attribute"
                fullWidth={true}
                value={selectedEntityTypeAttribute}
                onChange={(event, index, value) => {this.handleEntityTypeAttributeChange(key, value);}}>
                {CreateEntityMappingView.getMenuItems(entityTypeAttributes)}
            </SelectField>);
        }
        return <LoadingAnimation/>;
    }

    loadAttributes() {
        const attributesFetchingIncomplete = super.render(
            PromiseState.all(this.props.entityTypeAttributes, this.props.eventTypeAttributes));
        if (attributesFetchingIncomplete) {
            return attributesFetchingIncomplete;
        }
        let content = [];
        this.state.mappings.forEach((mapping, key) => {
                content.push(
                    <Row key={key}>
                        <Col md={6}>
                            {this.getEventTypeAttributesDropDown(key, mapping.eventTypeAttribute)}
                        </Col>
                        <Col md={5}>
                            {this.getEntityTypeAttributesDropDown(key, mapping.entityTypeAttribute)}
                        </Col>
                        <Col md={1}>
                            <IconButton
                                children={<IconDelete/>}
                                tooltip={<span>Delete Mapping</span>}
                                onTouchTap={() => {
                                    // this callback cannot be put into a separate method because of the key
                                    let mappings = this.state.mappings;
                                    if (key === 0 && this.state.mappings.length === 1) {
                                        mappings = CreateEntityMappingView.getDefaultMappings();
                                    } else {
                                        mappings.splice(key, 1);
                                    }
                                    this.setState({mappings});
                                }}/>
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
        const entityTypes = this.transformHierarchy(this.props.entityTypeHierarchy.value);
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
                                    onChange={
                                        (event, index, selectedEventTypeId) =>
                                            this.handleEventTypeChange(selectedEventTypeId)
                                    }
                                    floatingLabelText="Select Event Type"
                                    fullWidth={true}>
                                    {CreateEntityMappingView.getMenuItems(eventTypes)}
                                </SelectField>
                            </Col>
                            <Col md={6}>
                                <SelectField
                                    value={this.state.selectedEntityTypeId}
                                    onChange={
                                        (event, index, selectedEntityTypeId) =>
                                            this.handleEntityTypeChange(selectedEntityTypeId)
                                    }
                                    floatingLabelText="Select Entity Type"
                                    fullWidth={true}>
                                    {CreateEntityMappingView.getMenuItems(entityTypes)}
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
                                onTouchTap={this.prepareMappingsForSending}
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
