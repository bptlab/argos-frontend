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
import Notification from './../Utils/Notification';
import help from './../config/help';
import config from "../config/config";
import AppStyles from "../AppStyles";

class CreateEntityMappingView extends ConnectionComponent {
	constructor(props) {
		super(props);
		this.state = {
			targetStatus: "",
			selectedEventType: {value: null, errorMessage: ""},
			selectedEntityType: {value: null, errorMessage: ""},
			mappings: CreateEntityMappingView.getDefaultMappings()
		};

		// the entityMappingId is passed as url parameter in the edit view only!
		this.isCreateView = typeof this.props.match.params.entityMappingId === 'undefined';
		this.oldValuesWereLoaded = false;
		this.oldValuesShouldBeLoaded = false;
		this.handleEventTypeChange = this.handleEventTypeChange.bind(this);
		this.handleEntityTypeChange = this.handleEntityTypeChange.bind(this);
		this.handleAddNewMappingCondition = this.handleAddNewMappingCondition.bind(this);
		this.handleEventTypeAttributeChange = this.handleEventTypeAttributeChange.bind(this);
		this.handleEntityTypeAttributeChange = this.handleEntityTypeAttributeChange.bind(this);
		this.handleTargetStatusChange = this.handleTargetStatusChange.bind(this);
		this.prepareStateForSubmitting = this.prepareStateForSubmitting.bind(this);
		this.submitNewMapping = this.submitNewMapping.bind(this);
		this.submitUpdatedMapping = this.submitUpdatedMapping.bind(this);
		this.fetchInitialData = this.fetchInitialData.bind(this);
		this.renderMappingForm = this.renderMappingForm.bind(this);
		this.renderSelectTargetStatus = this.renderSelectTargetStatus.bind(this);

	}

	// returns the default mappings, called on load of create view and event or event type change
	static getDefaultMappings() {
		return [{
			eventTypeAttribute: {value: null, errorMessage: ""},
			entityTypeAttribute: {value: null, errorMessage: ""}
		}];
	}

	// returns the state loaded from a response
	static getLoadedStateFromResponse(entityMapping) {
		const mappings = [];
		entityMapping.EventEntityMappingConditions.forEach(mappingCondition => {
			mappings.push({
				eventTypeAttribute: {value: mappingCondition.EventTypeAttributeId, errorMessage: ""},
				entityTypeAttribute: {value: mappingCondition.EntityTypeAttributeId, errorMessage: ""}
			});
		});
		return {
			targetStatus: entityMapping.TargetStatus,
			selectedEventType: {value: entityMapping.EventTypeId},
			selectedEntityType: {value: entityMapping.EntityTypeId},
			mappings: mappings
		};
	}

	isValidInput() {
		let isValid = true;
		if(this.state.selectedEntityType.value === null) {
			this.setState({
				selectedEntityType: {value: null, errorMessage: config.messages.requiredFieldMessage}
			});
			isValid = false;
		}
		if (this.state.selectedEventType.value === null) {
			this.setState({
				selectedEventType: {value: null, errorMessage: config.messages.requiredFieldMessage}
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

	// prepares state for submitting, e.g. cleaning of the targetStatus
	prepareStateForSubmitting() {
		const entityMappingConditions = this.state.mappings.map((mappingStatement) => {
			return ({
				EventTypeAttributeId: mappingStatement.eventTypeAttribute.value,
				EntityTypeAttributeId: mappingStatement.entityTypeAttribute.value
			});
		});
		let targetStatus = this.state.targetStatus;
		if (targetStatus === "None") {
			targetStatus = "";
		}
		return {
			EventTypeId: this.state.selectedEventType.value,
			EntityTypeId: this.state.selectedEntityType.value,
			TargetStatus: targetStatus,
			EventEntityMappingConditions: entityMappingConditions
		};
	}

	submitNewMapping() {
		if(this.isValidInput()) {
			const preparedState = this.prepareStateForSubmitting();
			this.props.createEntityMapping(preparedState);
			Notification.addSnackbarNotificationOnReferrer(config.messages.createdEntityMappingMessage,
				Notification.ModeEnum.SUCCESS);
		}
	}

	submitUpdatedMapping() {
		if(this.isValidInput()) {
			const preparedState = this.prepareStateForSubmitting();
			this.props.updateEntityMapping(preparedState);
			Notification.addSnackbarNotificationOnReferrer(config.messages.updatedEntityMappingMessage,
				Notification.ModeEnum.SUCCESS);
		}
	}

	//takes hierarchy and returns a list of all entities in this hierarchy ordered by name
	static transformHierarchy(hierarchy) {
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
			selectedEventType: {value: selectedEventTypeId, errorMessage: ""},
			mappings: CreateEntityMappingView.getDefaultMappings()
		});
	}

	handleEntityTypeChange(event, index, selectedEntityTypeId) {
		this.setState({
			selectedEntityType: {value: selectedEntityTypeId, errorMessage: ""},
			mappings: CreateEntityMappingView.getDefaultMappings()
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
		return (
			<SelectField
				floatingLabelText={config.descriptions.selectEventTypeAttributeHint}
				fullWidth={true}
				errorText={this.state.mappings[key].eventTypeAttribute.errorMessage}
				value={selectedEventTypeAttribute}
				onChange={(event, index, value) => {
					this.handleEventTypeAttributeChange(key, value);
				}}>
				{CreateEntityMappingView.getMenuItems(eventTypeAttributes)}
			</SelectField>
		);
	}

	getEntityTypeAttributesDropDown(key, selectedEntityTypeAttribute) {
		const entityTypeAttributes = this.props.entityTypeAttributes.value;
		return (
			<SelectField
				floatingLabelText={config.descriptions.selectEntityTypeAttributeHint}
				fullWidth={true}
				value={selectedEntityTypeAttribute}
				errorText={this.state.mappings[key].entityTypeAttribute.errorMessage}
				onChange={(event, index, value) => {
					this.handleEntityTypeAttributeChange(key, value);
				}}>
				{CreateEntityMappingView.getMenuItems(entityTypeAttributes)}
			</SelectField>
		);
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
	
	handleMappingConditionDelete(key) {
		let mappings = this.state.mappings;
		if (key === 0 && this.state.mappings.length === 1) {
			mappings = CreateEntityMappingView.getDefaultMappings();
		} else {
			mappings.splice(key, 1);
		}
		this.setState({mappings});
	}

	static handleOptionalActionsSuccess(optionalActions) {
		if (optionalActions && optionalActions.fulfilled) {
			window.history.back();
			return null;
		}
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

	static abort() {
		window.history.back();
	}

	loadAttributeInputFields() {
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
			<div
				data-hint={help.input.entityMappingView.attributesSelection}
				data-hintPosition="top-middle">
				{content}
				<FlatButton
					label={config.descriptions.addMapping}
					onTouchTap={this.handleAddNewMappingCondition}
					icon={<IconAdd/>}/>
			</div>);
	}

	renderSelectTargetStatus() {
		return (
			<Row>
				<Col md={12}>
					<SelectField
						data-hint={help.input.entityMappingView.targetStatus}
						data-hintPosition="middle-middle"
						value={this.state.targetStatus}
						onChange={this.handleTargetStatusChange}
						floatingLabelText={config.descriptions.selectTargetStatusHint}
						fullWidth={true}>
						{config.statuses.map((status, key) => {
							if (status.name !== "UNDEFINED") {
								return <MenuItem
									key={key}
									value={status.name}
									primaryText={status.name}/>;
							}
							return <MenuItem
								value={"None"}
								primaryText={"None"}
								key={key}/>;
						})}
					</SelectField>
				</Col>
			</Row>
		);
	}

	renderSelectTypes(initialData) {
		return (
			<Row>
				<Col md={6}>
					<SelectField
						data-hint={help.input.entityMappingView.eventTypeSelection}
						data-hintPosition="middle-middle"
						value={this.state.selectedEventType.value}
						errorText={this.state.selectedEventType.errorMessage}
						onChange={this.handleEventTypeChange}
						floatingLabelText={config.descriptions.selectEventTypeHint}
						fullWidth={true}>
						{CreateEntityMappingView.getMenuItems(initialData.eventTypes)}
					</SelectField>
				</Col>
				<Col md={6}>
					<SelectField
						data-hint={help.input.entityMappingView.eventTypeSelection}
						data-hintPosition="middle-middle"
						value={this.state.selectedEntityType.value}
						errorText={this.state.selectedEntityType.errorMessage}
						onChange={this.handleEntityTypeChange}
						floatingLabelText={config.descriptions.selectEntityTypeHint}
						fullWidth={true}>
						{CreateEntityMappingView.getMenuItems(initialData.entityTypes)}
					</SelectField>
				</Col>
			</Row>
		);
	}

	static renderButtons(submitCallback) {
		return (
			<div className={css(AppStyles.textAlignCenter)}>
				<RaisedButton
					label="Abort"
					icon={<IconCancel/>}
					className={css(AppStyles.marginAllSites)}
					secondary={true}
					onTouchTap={CreateEntityMappingView.abort}
				/>
				<RaisedButton
					label="Save"
					icon={<IconSave/>}
					onTouchTap={submitCallback}
					className={css(AppStyles.marginAllSites)}
					primary={true}
				/>
			</div>
		);
	}

	renderMappingForm(initialData, optionalActions, submitCallback) {
		if (optionalActions && optionalActions.rejected) {
			Notification.addSnackbarNotificationOnSelf(optionalActions.reason,
				Notification.ModeEnum.ERROR);
		}
		return (
			<Container>
				<div>
					{this.renderSelectTargetStatus()}
					{this.renderSelectTypes(initialData)}
					{initialData.attributeFields}
					{CreateEntityMappingView.renderButtons(submitCallback)}
				</div>
			</Container>
		);
	}

	fetchInitialData() {
		const allFetches = PromiseState.all([this.props.eventTypes, this.props.entityTypeHierarchy]);
		const eventTypes = this.props.eventTypes.value;
		const entityTypes = CreateEntityMappingView.transformHierarchy(this.props.entityTypeHierarchy.value);
		const connectionIncomplete = super.render(allFetches);
		if (connectionIncomplete) {
			return connectionIncomplete;
		}
		let attributeFields = "";
		if (this.props.eventTypeAttributes && this.props.entityTypeAttributes
			&& this.props.eventTypeAttributes.fulfilled && this.props.entityTypeAttributes.fulfilled) {
			attributeFields = this.loadAttributeInputFields();
		}

		return {
			eventTypes: eventTypes,
			entityTypes: entityTypes,
			attributeFields: attributeFields
		};
	}

	renderEditView() {
		const optionalActions = this.props.updateEntityMappingResponse;
		CreateEntityMappingView.handleOptionalActionsSuccess(optionalActions);
		const initialDataLoaded = this.fetchInitialData();
		if (!initialDataLoaded.hasOwnProperty("eventTypes")) {
			return initialDataLoaded;
		}
		this.oldValuesShouldBeLoaded = true;
		return (
			<div>
				<Header title={"Edit Entity Mapping"}/>
				<div className={AppStyles.elementMarginTop}>
					{this.renderMappingForm(initialDataLoaded, optionalActions, this.submitUpdatedMapping)}
				</div>
			</div>
		);
	}

	renderCreateView() {
		const optionalActions = this.props.createEntityMappingResponse;
		CreateEntityMappingView.handleOptionalActionsSuccess(optionalActions);
		const initialDataLoaded = this.fetchInitialData();
		if (!initialDataLoaded.hasOwnProperty("eventTypes")) {
			return initialDataLoaded;
		}
		return (
			<div>
				<Header title={"Create Entity Mapping"}/>
				<div className={AppStyles.elementMarginTop}>
					{this.renderMappingForm(initialDataLoaded, optionalActions, this.submitNewMapping)}
				</div>
			</div>
		);
	}

	// loads entity mapping in edit view
	componentWillMount() {
		if (!this.isCreateView) {
			this.props.lazyLoadEntityMapping();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (!this.isCreateView && !this.oldValuesWereLoaded && this.oldValuesShouldBeLoaded && this.props.entityMapping.fulfilled) {
			// in edit view, when old values should be loaded into the interface
			const entityMapping = this.props.entityMapping.value;
			this.setState(CreateEntityMappingView.getLoadedStateFromResponse(entityMapping));
			this.props.lazyEventTypeAttributeLoading(entityMapping.EventTypeId);
			this.props.lazyEntityTypeAttributeLoading(entityMapping.EntityTypeId);
			this.oldValuesWereLoaded = true;
		}

		if(prevState.selectedEventType.value !== this.state.selectedEventType.value) {
			// when selected event type changed
			this.props.lazyEventTypeAttributeLoading(this.state.selectedEventType.value);
		}
		if(prevState.selectedEntityType.value !== this.state.selectedEntityType.value) {
			// when selected entity type changed
			this.props.lazyEntityTypeAttributeLoading(this.state.selectedEntityType.value);
		}
	}

	render() {
		if (!this.isCreateView) {
			return this.renderEditView();
		}
		return this.renderCreateView();
	}
}

export default ConnectionComponent.argosConnector()((props) => ({
	eventTypes: config.backendRESTRoute + `/eventtypes`,
	entityTypeHierarchy: config.backendRESTRoute + `/entitytype/hierarchy`,
	lazyEventTypeAttributeLoading: eventTypeId => ({
		eventTypeAttributes: config.backendRESTRoute + `/eventtype/${eventTypeId}/attributes`
	}),
	lazyEntityTypeAttributeLoading: entityTypeId => ({
		entityTypeAttributes: config.backendRESTRoute + `/entitytype/${entityTypeId}/attributes`
	}),
	lazyLoadEntityMapping: () => ({
		entityMapping: config.backendRESTRoute + `/entitymapping/${props.match.params.entityMappingId}`
	}),
	createEntityMapping: (body) => ({
		createEntityMappingResponse: {
			url: config.backendRESTRoute + `/entitymapping/create`,
			method: 'POST',
			body: JSON.stringify(body)
		}
	}),
	updateEntityMapping: (body) => ({
		updateEntityMappingResponse: {
			url: config.backendRESTRoute + `/entitymapping/${props.match.params.entityMappingId}/edit`,
			method: 'PUT',
			body: JSON.stringify(body)
		}
	})
}))(CreateEntityMappingView);
