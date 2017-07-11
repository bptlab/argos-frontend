import React from "react";
import ConnectionComponent from "./../Utils/ConnectionComponent.js";
import LoadingAnimation from "./../Utils/LoadingAnimation";
import {Col, Row} from "react-grid-system";
import StatusDiagram from "./StatusDiagram";
import config from "./../config/config";
import Utils from "./../Utils/Utils";
import './CardGrid.css';
import EntityCard from "./EntityCard";

class CardGrid extends ConnectionComponent {
	constructor(props) {
		super(props);
		this.isCoveredByFilter = this.isCoveredByFilter.bind(this);
	}



	isCoveredByFilter(childEntity) {
		return this.testFilter(childEntity, this.props.filterObject);
	}

	testFilter(childEntity, filter) {
		if (!filter.value) {
			return true;
		}

		if (!filter.column) {
			const attributeValues = this.getAttributeValues(childEntity);
			attributeValues.push(childEntity.Name);
			return this.doesContain(attributeValues, filter.value);
		} else {
			const columnAttribute = childEntity.Attributes.find((attribute) => {
				return attribute.Name === filter.column;
			});

			if (!columnAttribute) {
				return false;
			} else {
				return this.doesContain([columnAttribute.Value], filter.value);
			}
		}
	}

	doesContain(baseValueArray, subValue) {
		return baseValueArray.some((baseValue) => {
			return (baseValue.toString().toLowerCase().indexOf(subValue.toString().toLowerCase()) > -1);
		});
	}

	getAttributeValues(childEntity) {
		const attributeArray = [];
		childEntity.Attributes.forEach((attribute) => {
			attributeArray.push(attribute.Name);
			attributeArray.push(attribute.Value);
		});
		return attributeArray;
	}

	getEntitiesToShow() {
		const entities = this.props.entities.value.filter(this.isCoveredByFilter);
		entities.sort((entityA, entityB) => {
			const entityAStatus = this.getIndexOfEntityStatus(entityA);
			const entityBStatus = this.getIndexOfEntityStatus(entityB);
			return entityAStatus - entityBStatus;
		});
		return entities;
	}

	getIndexOfEntityStatus(entity) {
		return config.statuses.findIndex((status) => {
			return status.name === entity.Status;
		});
	}

	render() {
		if (!this.props.entities) {
			return <LoadingAnimation/>;
		}
		const connectionIncomplete = super.render(this.props.entities);
		if (connectionIncomplete) {
			return connectionIncomplete;
		}
		const entitiesToShow = this.getEntitiesToShow();
		return (
			<div>
				<StatusDiagram
					entities={entitiesToShow}
					className="elementMarginTop"/>
				<Row className="elementMarginTop dFlex flexWrap">
					{entitiesToShow.map((childEntity, index) => {
						return (
							<Col
								key={index} xs={12} sm={4} md={3}
								className="dFlex">
								<EntityCard
									entity={childEntity}
									parentEntityId={this.props.currentEntity.Id}/>
							</Col>
						);
					})}
				</Row>
			</div>
		);
	}
}

export default ConnectionComponent.argosConnector({fetch: ConnectionComponent.switchFetch})(props => {
	const necessaryAttributes = Utils.getNecessaryAttributes(props.entityType);
	if (!necessaryAttributes) {
		return {
			entities: {
				url: config.backendRESTRoute + `/entitytype/${props.entityType.Id}/attributes`,
				then: attributes => config.backendRESTRoute + `/entity/${props.currentEntity.Id}`
				+ `/children/type/${props.entityType.Id}`
				+ `/${attributes.map(attribute => attribute.Name).join("+")}`,
			}
		};
	}
	return {
		entities: {
			url: config.backendRESTRoute + `/entity/${props.currentEntity.Id}`
			+ `/children/type/${props.entityType.Id}`
			+ `/${necessaryAttributes.map(attribute => attribute).join("+")}`
		}
	};
})(CardGrid);