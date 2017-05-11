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
import {css} from 'aphrodite';

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

	componentDidUpdate(prevProps, prevState) {
		if(prevState.selectedEventTypeId !== this.state.selectedEventTypeId) {
			this.props.lazyEventTypeAttributeLoading(this.state.selectedEventTypeId);
		}
		if(prevState.selectedEntityTypeId !== this.state.selectedEntityTypeId) {
			this.props.lazyEntityTypeAttributeLoading(this.state.selectedEntityTypeId);
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

	handleEventTypeChange(event, index, selectedEventTypeId) {
		this.setState({
			selectedEventTypeId: selectedEventTypeId,
			mappings: CreateEntityMappingView.getDefaultMappings()
		});
	}

	handleEntityTypeChange(selectedEntityTypeId) {
		this.setState({
			selectedEntityTypeId: selectedEntityTypeId,
			mappings: CreateEntityMappingView.getDefaultMappings()
		});
	}

	handleAddNewMappingCondition() {
		const mappings = this.state.mappings;
		mappings.push({entityTypeAttribute: null, eventTypeAttribute: null});
		this.setState({
			mappings: mappings
		});
	}

	handleEventTypeAttributeChange(key, eventTypeAttribute) {
		const mappings = this.state.mappings;
		mappings[key].eventTypeAttribute = eventTypeAttribute;
		this.setState({
			mappings: mappings
		});
	}

	handleEntityTypeAttributeChange(key, entityTypeAttribute) {
		const mappings = this.state.mappings;
		mappings[key].entityTypeAttribute = entityTypeAttribute;
		this.setState({
			mappings: mappings
		});
	}

	getEventTypeAttributesDropDown(key, selectedEventTypeAttribute) {
		const eventTypeAttributes = this.props.eventTypeAttributes.value;
		return (<SelectField
			floatingLabelText="Select Event Type Attribute"
			fullWidth={true}
			value={selectedEventTypeAttribute}
			onChange={(event, index, value) => {
				this.handleEventTypeAttributeChange(key, value);
			}}>
			{CreateEntityMappingView.getMenuItems(eventTypeAttributes)}
		</SelectField>);
	}

	prepareMappingsForSending() {
		//must be called before saving the data
		let mappings = this.state.mappings;
		const cleanedMappings = [];
		mappings.forEach((mapping) => {
			if (mapping.eventTypeAttribute && mapping.entityTypeAttribute) {
				cleanedMappings.push(mapping);
			}
		});
		this.setState({mappings: mappings});
		//this.setState({mappings: cleanedMappings}); use this line for real functionality
	}


	getEntityTypeAttributesDropDown(key, selectedEntityTypeAttribute) {
		const entityTypeAttributes = this.props.entityTypeAttributes.value;
		return (<SelectField
			floatingLabelText="Select Entity Type Attribute"
			fullWidth={true}
			value={selectedEntityTypeAttribute}
			onChange={(event, index, value) => {
				this.handleEntityTypeAttributeChange(key, value);
			}}>
			{CreateEntityMappingView.getMenuItems(entityTypeAttributes)}
		</SelectField>);
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
						{this.getEventTypeAttributesDropDown(key, mapping.eventTypeAttribute)}
					</Col>
					<Col md={5}>
						{this.getEntityTypeAttributesDropDown(key, mapping.entityTypeAttribute)}
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
						<Row>
							<Col md={6}>
								<SelectField
									value={this.state.selectedEventTypeId}
									onChange={this.handleEventTypeChange}
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

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(() => ({
	eventTypes: config.backendRESTRoute + `/eventtypes`,
	entityTypeHierarchy: config.backendRESTRoute + `/entitytype/hierarchy`,
	lazyEventTypeAttributeLoading: eventTypeId => ({
		eventTypeAttributes: config.backendRESTRoute + `/eventtype/${eventTypeId}/attributes`
	}),
	lazyEntityTypeAttributeLoading: entityTypeId => ({
		entityTypeAttributes: config.backendRESTRoute + `/entityType/${entityTypeId}/attributes`
	}),
}))(CreateEntityMappingView);
