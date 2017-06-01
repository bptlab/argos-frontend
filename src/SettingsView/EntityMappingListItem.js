import React from 'react';
import Utils from '../Utils/Utils';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import config from './../config/config.js';
import {Row, Col} from 'react-grid-system';
import {Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn} from 'material-ui/Table'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconDelete from 'material-ui/svg-icons/action/delete';
import ListItem from 'material-ui/List';
import {PromiseState} from 'react-refetch';
import ConfirmationMessage from "../Utils/ConfirmationMessage";

class EntityMappingListItem extends ConnectionComponent {

	constructor() {
		super();
		this.getEntityTypeName = this.getEntityTypeName.bind(this);
		this.getEntityTypeAttributeName = this.getEntityTypeAttributeName.bind(this);
		this.getEventTypeAttributeName = this.getEventTypeAttributeName.bind(this);
		this.deleteMapping = this.deleteMapping.bind(this);
	}

	getEntityTypeName(entityTypeId) {
		let searchedEntityType = undefined;
		window.hierarchy.forEach(function (layer) {
			layer.forEach(function (entityType) {
				if (entityType.Id === entityTypeId) {
					searchedEntityType = entityType;
				}
			});
		});
		return searchedEntityType.Name;
	}

	getEntityTypeAttributeName(attributeId) {
		return this.props.entityTypeAttributes.value.find(attribute => {
			return attribute.Id === attributeId;
		}).Name;
	}

	getEventTypeAttributeName(attributeId) {
		return this.props.eventTypeAttributes.find(attribute => {
			return attribute.Id === attributeId;
		}).Name;
	}

    deleteMapping() {
        this.props.deleteMapping(this.props.mapping);
    }

    getMappingActionButtons() {
		return (
			<div>
				<ConfirmationMessage
					actionToPerform={this.deleteMapping}
					ref={(input) => {this.confirmationMessage = input;}}>
					{config.messages.deleteEntityMappingMessage}
				</ConfirmationMessage>
				<IconButton
					tooltip="Edit this mapping"
					href={Utils.getLink(`/settings/entityMapping/${this.props.mapping.Id}/edit`)}
					className="verticalAlignTop">
					<IconEdit/>
				</IconButton>
				<IconButton
					tooltip="Delete this mapping"
					onTouchTap={() => {this.confirmationMessage.handleOpen();}}>
					<IconDelete/>
				</IconButton>
			</div>);
	}

	render() {
		const allFetches = PromiseState.all([this.props.entityTypeAttributes]);
		const connectionIncomplete = super.render(allFetches);
		if (connectionIncomplete) {
			return connectionIncomplete;
		}

		return (
			<div>
			<Table selectable={false}>
				<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
					<TableRow>
						<TableHeaderColumn>{this.props.eventType.Name}</TableHeaderColumn>
						<TableHeaderColumn>{this.getEntityTypeName(this.props.mapping.EntityTypeId)}</TableHeaderColumn>
						<TableHeaderColumn>{this.getMappingActionButtons()}</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={false}>
					{this.props.mapping.EventEntityMappingConditions.map((condition, key) => {
						return (
							<TableRow>
								<TableRowColumn>{this.getEventTypeAttributeName(condition.EventTypeAttributeId)}</TableRowColumn>
								<TableRowColumn>{this.getEntityTypeAttributeName(condition.EntityTypeAttributeId)}</TableRowColumn>
								<TableRowColumn></TableRowColumn>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
				<Divider style={{backgroundColor: config.colors.accent}} />
				</div>
		);
	}
}

export default ConnectionComponent.argosConnector()(props => ({
	entityTypeAttributes: config.backendRESTRoute + `/entitytype/${props.mapping.EntityTypeId}/attributes`
}))(EntityMappingListItem);