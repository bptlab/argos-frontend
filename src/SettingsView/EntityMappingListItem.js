import React from 'react';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import config from './../config/config.js';
import {Row, Col} from 'react-grid-system';
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

	render() {
		const allFetches = PromiseState.all([this.props.entityTypeAttributes]);
		const connectionIncomplete = super.render(allFetches);
		if (connectionIncomplete) {
			return connectionIncomplete;
		}

		return (
			<ListItem>
				<Row>
					<Col md={10}>
						{this.props.eventType.Name} - {this.getEntityTypeName(this.props.mapping.EntityTypeId)}
					</Col>
					<Col md={2}>
						<IconButton><IconEdit/></IconButton>
						<ConfirmationMessage
							actionToPerform={this.deleteMapping}
							ref={(input) => {this.confirmationMessage = input;}}>
                            {config.messages.deleteEntityMappingMessage}
						</ConfirmationMessage>
						<IconButton onTouchTap={() => {this.confirmationMessage.handleOpen();}}>
							<IconDelete/>
						</IconButton>
					</Col>
				</Row>
				<Row>
					<Col offset={{md: 1}}>
						{this.props.mapping.EventEntityMappingConditions.map((condition) => {
							return (
								<div key={condition.EntityTypeAttributeId}>
									{this.getEventTypeAttributeName(condition.EventTypeAttributeId)}
									&nbsp;-&nbsp;
									{this.getEntityTypeAttributeName(condition.EntityTypeAttributeId)}
								</div>
							);
						})}
					</Col>
				</Row>
			</ListItem>
		);
	}
}

export default ConnectionComponent.argosConnector()(props => ({
	entityTypeAttributes: config.backendRESTRoute + `/entitytype/${props.mapping.EntityTypeId}/attributes`
}))(EntityMappingListItem);