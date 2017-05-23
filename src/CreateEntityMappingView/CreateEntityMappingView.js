import React from 'react';
import {PromiseState} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import {Col, Container, Row} from "react-grid-system";
import {FlatButton, IconButton, MenuItem, RaisedButton, SelectField} from "material-ui";
import IconSave from "material-ui/svg-icons/content/save";
import IconCancel from "material-ui/svg-icons/navigation/cancel";
import IconAdd from "material-ui/svg-icons/content/add";
import IconDelete from "material-ui/svg-icons/action/delete";
import Header from './../Header';
import {css} from 'aphrodite';
import ErrorMessage from './../Utils/ErrorMessage.js';

import config from "../config/config";
import AppStyles from "../AppStyles";

class CreateEntityMappingView extends ConnectionComponent {
	constructor(props) {
		super(props);
		this.state = {
			targetStatus: "",
			selectedEventTypeId: {value: null, errorMessage: ""},
			selectedEntityTypeId: {value: null, errorMessage: ""},
			mappings: CreateEntityMappingView.getDefaultMappings()
		};
		this.handleEventTypeChange = this.handleEventTypeChange.bind(this);
		this.handleEntityTypeChange = this.handleEntityTypeChange.bind(this);
		this.handleAddNewMappingCondition = this.handleAddNewMappingCondition.bind(this);
		this.handleEventTypeAttributeChange = this.handleEventTypeAttributeChange.bind(this);
		this.handleEntityTypeAttributeChange = this.handleEntityTypeAttributeChange.bind(this);
        this.handleTargetStatusChange = this.handleTargetStatusChange.bind(this);
        this.submitMapping = this.submitMapping.bind(this);
	}

	static getDefaultMappings() {
		return [{
			eventTypeAttribute: {value: null, errorMessage: ""},
			entityTypeAttribute: {value: null, errorMessage: ""}
		}];
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

    componentDidUpdate(prevProps, prevState) {
        if(prevState.selectedEventTypeId.value !== this.state.selectedEventTypeId.value) {
            this.props.lazyEventTypeAttributeLoading(this.state.selectedEventTypeId.value);
        }
        if(prevState.selectedEntityTypeId.value !== this.state.selectedEntityTypeId.value) {
            this.props.lazyEntityTypeAttributeLoading(this.state.selectedEntityTypeId.value);
        }
    }
    
    submitMapping() {
		if(this.isValidInput()) {
			const  entityMappingConditions = this.state.mappings.map((mappingStatement) => {
				return ({
					EventTypeAttributeId: mappingStatement.eventTypeAttribute.value,
					EntityTypeAttributeId: mappingStatement.entityTypeAttribute.value
				});
			});
			this.props.createEntityMapping({
				EventTypeId: this.state.selectedEventTypeId.value,
				EntityTypeId: this.state.selectedEntityTypeId.value,
				TargetStatus: this.state.targetStatus,
				EventEntityMappingConditions: entityMappingConditions
			});
		}
	}
	
	abort() {
		window.history.back();
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
			allEntities.sort((a, b) => {
				return a.Name > b.Name;
			});
			return allEntities;
		}
		return [];
	}

	handleTargetStatusChange(event, index, selectedTargetStatus) {
		this.setState({
            targetStatus: selectedTargetStatus
		});
	}

	handleEventTypeChange(event, index, selectedEventTypeId) {
		this.setState({
			selectedEventTypeId: {value: selectedEventTypeId, errorMessage: ""},
			mappings: CreateEntityMappingView.getDefaultMappings()
		});
	}

	handleEntityTypeChange(event, index, selectedEntityTypeId) {
		this.setState({
			selectedEntityTypeId: {value: selectedEntityTypeId, errorMessage: ""},
			mappings: CreateEntityMappingView.getDefaultMappings()
		});
	}

	handleAddNewMappingCondition() {
		const mappings = this.state.mappings;
		mappings.push({
			entityTypeAttribute: {value: null, errorMessage: ""},
			eventTypeAttribute: {value: null, errorMessage: ""}
		});
		this.setState({
			mappings: mappings
		});
	}

	handleEventTypeAttributeChange(key, eventTypeAttribute) {
		const mappings = this.state.mappings;
		mappings[key].eventTypeAttribute.value = eventTypeAttribute;
        mappings[key].eventTypeAttribute.errorMessage = "";
		this.setState({
			mappings: mappings
		});
	}

	handleEntityTypeAttributeChange(key, entityTypeAttribute) {
		const mappings = this.state.mappings;
		mappings[key].entityTypeAttribute.value = entityTypeAttribute;
        mappings[key].entityTypeAttribute.errorMessage = "";
		this.setState({
			mappings: mappings
		});
	}

	getEventTypeAttributesDropDown(key, selectedEventTypeAttribute) {
		const eventTypeAttributes = this.props.eventTypeAttributes.value;
		return (<SelectField
			floatingLabelText="Select Event Type Attribute"
			fullWidth={true}
			errorText={this.state.mappings[key].eventTypeAttribute.errorMessage}
			value={selectedEventTypeAttribute}
			onChange={(event, index, value) => {
				this.handleEventTypeAttributeChange(key, value);
			}}>
			{CreateEntityMappingView.getMenuItems(eventTypeAttributes)}
		</SelectField>);
	}

    getEntityTypeAttributesDropDown(key, selectedEntityTypeAttribute) {
        const entityTypeAttributes = this.props.entityTypeAttributes.value;
        return (<SelectField
			floatingLabelText="Select Entity Type Attribute"
			fullWidth={true}
			value={selectedEntityTypeAttribute}
			errorText={this.state.mappings[key].entityTypeAttribute.errorMessage}
			onChange={(event, index, value) => {
                this.handleEntityTypeAttributeChange(key, value);
            }}>
            {CreateEntityMappingView.getMenuItems(entityTypeAttributes)}
		</SelectField>);
    }

	isValidInput() {
		let isValid = true;
		if(!this.state.selectedEntityTypeId.value) {
			this.setState({
				selectedEntityTypeId: {value: null, errorMessage: config.messages.requiredFieldMessage}
			});
			isValid = false;
        }
        if (!this.state.selectedEventTypeId.value) {
            this.setState({
                selectedEventTypeId: {value: null, errorMessage: config.messages.requiredFieldMessage}
            });
            isValid = false;
		}
		const mappings = [];
        this.state.mappings.forEach((mapping) => {
			if (!mapping.eventTypeAttribute.value) {
				mapping.eventTypeAttribute.errorMessage = config.messages.requiredFieldMessage;
				isValid = false;
            }
            if (!mapping.entityTypeAttribute.value) {
                mapping.entityTypeAttribute.errorMessage = config.messages.requiredFieldMessage;
				isValid = false;
			}
			mappings.push(mapping);
		});
        this.setState({
            mappings: mappings
        });
		return isValid;
	}
	
	handleMappingConditionDelete(key) {
		let mappings = this.state.mappings;
		if (key === 0 && this.state.mappings.length === 1) {
			mappings = CreateEntityMappingView.getDefaultMappings();
		} else {
			mappings.splice(key, 1);
		}
		this.setState({mappings});
	}

	loadAttributes() {
		const attributesFetchingIncomplete = super.render(
			PromiseState.all(this.props.entityTypeAttributes, this.props.eventTypeAttributes));
		if (attributesFetchingIncomplete) {
			return attributesFetchingIncomplete;
		}
		const content = [];
		this.state.mappings.forEach((mapping, key) => {
			content.push(
				<Row key={key}>
					<Col md={6}>
						{this.getEventTypeAttributesDropDown(key, mapping.eventTypeAttribute.value)}
					</Col>
					<Col md={5}>
						{this.getEntityTypeAttributesDropDown(key, mapping.entityTypeAttribute.value)}
					</Col>
					<Col md={1}>
						<IconButton
							children={<IconDelete/>}
							tooltip={<span>Delete Mapping</span>}
							onTouchTap={this.handleMappingConditionDelete.bind(this, key)}/>
					</Col>
				</Row>);
		});
		return (
			<div>
				{content}
				<FlatButton
					label={config.descriptions.addMapping}
					onTouchTap={this.handleAddNewMappingCondition}
					icon={<IconAdd/>}/>
			</div>);
	}

	render() {
		const allFetches = PromiseState.all([this.props.eventTypes, this.props.entityTypeHierarchy]);
		const eventTypes = this.props.eventTypes.value;
		const optionalActions = this.props.createEntityMappingResponse;
		if(optionalActions && optionalActions.fulfilled) {
			window.history.back();
			return null;
		}
		const entityTypes = this.transformHierarchy(this.props.entityTypeHierarchy.value);
		const connectionIncomplete = super.render(allFetches);
		if (connectionIncomplete) {
			return connectionIncomplete;
		}
		let attributeFields = "";
		if (this.props.eventTypeAttributes && this.props.entityTypeAttributes 
			&& this.props.eventTypeAttributes.fulfilled && this.props.entityTypeAttributes.fulfilled) {
			attributeFields = this.loadAttributes();
		}
		return (
			<div>
				<Header title={"Create Entity Mapping"}/>
				<div className={AppStyles.elementMarginTop}>
					<Container>
						{optionalActions && optionalActions.rejected &&
							<ErrorMessage message={optionalActions.reason} />
						}
						<Row>
							<Col md={12}>
								<SelectField
									value={this.state.targetStatus}
									onChange={this.handleTargetStatusChange}
									floatingLabelText={"Target Status, leave empty if no status update is required"}
									fullWidth={true}>
									{config.statuses.map((status, key) => {
										if (status.name !== "UNDEFINED") {
                                            return <MenuItem
												key={key}
												value={status.name}
												primaryText={status.name}/>;
                                        }
                                        return <div key={key}/>;
									})}
								</SelectField>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<SelectField
									value={this.state.selectedEventTypeId.value}
									errorText={this.state.selectedEventTypeId.errorMessage}
									onChange={this.handleEventTypeChange}
									floatingLabelText="Select Event Type"
									fullWidth={true}>
									{CreateEntityMappingView.getMenuItems(eventTypes)}
								</SelectField>
							</Col>
							<Col md={6}>
								<SelectField
									value={this.state.selectedEntityTypeId.value}
									errorText={this.state.selectedEntityTypeId.errorMessage}
									onChange={this.handleEntityTypeChange}
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
								onTouchTap={this.abort}
							/>
							<RaisedButton
								label="Save"
								icon={<IconSave/>}
								onTouchTap={this.submitMapping}
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

export default ConnectionComponent.argosConnector()(() => ({
	eventTypes: config.backendRESTRoute + `/eventtypes`,
	entityTypeHierarchy: config.backendRESTRoute + `/entitytype/hierarchy`,
	lazyEventTypeAttributeLoading: eventTypeId => ({
		eventTypeAttributes: config.backendRESTRoute + `/eventtype/${eventTypeId}/attributes`
	}),
	lazyEntityTypeAttributeLoading: entityTypeId => ({
		entityTypeAttributes: config.backendRESTRoute + `/entitytype/${entityTypeId}/attributes`
	}),
	createEntityMapping: (body) => ({
		createEntityMappingResponse: {
			url: config.backendRESTRoute + `/entitymapping/create`,
			method: 'POST',
			body: JSON.stringify(body)
		}
	})
}))(CreateEntityMappingView);
