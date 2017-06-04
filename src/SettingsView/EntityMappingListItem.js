import React from 'react';
import Utils from '../Utils/Utils';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import config from './../config/config.js';
import help from './../config/help.js';
import {Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn} from 'material-ui/Table'
import IconButton from 'material-ui/IconButton';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconDelete from 'material-ui/svg-icons/action/delete';
import {PromiseState} from 'react-refetch';
import ConfirmationMessage from "../Utils/ConfirmationMessage";
import "./EntityMappingListItem.css";

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
					tooltip={help.button.editEntityMapping}
					tooltipPosition="bottom-left"
					href={Utils.getLink(`/settings/entityMapping/${this.props.mapping.Id}/edit`)}
					className="verticalAlignTop">
					<IconEdit/>
				</IconButton>
				<IconButton
					tooltip={help.button.deleteEntityMapping}
					tooltipPosition="bottom-left"
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
			<Table selectable={false}>
				<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
					<TableRow>
						<TableHeaderColumn className="mapping-headline">{this.props.eventType.Name}</TableHeaderColumn>
						<TableHeaderColumn className="mapping-headline">
							{this.getEntityTypeName(this.props.mapping.EntityTypeId)}
							</TableHeaderColumn>
						<TableHeaderColumn className="smallWidth">{this.getMappingActionButtons()}</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={false}>
					{this.props.mapping.EventEntityMappingConditions.map((condition, key) => {
						return (
							<TableRow key={key}>
								<TableRowColumn
									className="mapping-condition"
									key={key + "EventTypeName"}>
									{this.getEventTypeAttributeName(condition.EventTypeAttributeId)}
								</TableRowColumn>
								<TableRowColumn
									className="mapping-condition"
									key={key + "EntityName"}>
									{this.getEntityTypeAttributeName(condition.EntityTypeAttributeId)}
								</TableRowColumn>
								<TableRowColumn className="smallWidth" key={key + "Buttons"}></TableRowColumn>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		);
	}
}

export default ConnectionComponent.argosConnector()(props => ({
	entityTypeAttributes: config.backendRESTRoute + `/entitytype/${props.mapping.EntityTypeId}/attributes`
}))(EntityMappingListItem);