import React from "react";
import ConnectionComponent from "./../Utils/ConnectionComponent.js";
import {Card, CardActions, CardText, CardTitle} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import LoadingAnimation from "./../Utils/LoadingAnimation";
import {Col, Row} from "react-grid-system";
import EntityInformation from "../Utils/EntityInformation";
import StatusDiagram from "./StatusDiagram";
import config from "./../config/config";
import help from "./../config/help";
import Utils from "./../Utils/Utils";
import './CardGrid.css';

class CardGrid extends ConnectionComponent {
	constructor(props) {
		super(props);
		this.isCoveredByFilter = this.isCoveredByFilter.bind(this);
	}

	backgroundColor(status) {
		return {backgroundColor: Utils.getColorForStatus(status)};
	}

	backgroundColorLight(status) {
		return {backgroundColor: Utils.getLightColorForStatus(status)};
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

	render() {
		if (!this.props.entities) {
			return <LoadingAnimation/>;
		}
		const connectionIncomplete = super.render(this.props.entities);
		if (connectionIncomplete) {
			return connectionIncomplete;
		}
		const entitiesToShow = this.props.entities.value.filter(this.isCoveredByFilter);
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
								<Card className="card">
									<CardTitle
										style={this.backgroundColor(childEntity.Status)}
										title={childEntity.Name}
										titleColor={config.colors.textAlternate} />
									<CardText
										style={this.backgroundColorLight(childEntity.Status)}
										className="flexGrow1">
										<EntityInformation entity={childEntity}/>
									</CardText>
									<CardActions style={this.backgroundColorLight(childEntity.Status)}>
										<Row className="noMargin">
											<Col xs={6}>
												{childEntity.HasChildren &&
												<FlatButton
													data-hint={help.button.showChildrenOfEntity}
													data-hintPosition="top-right"
													label="Children"
													href={Utils.getLink(`/grid/${childEntity.Id}`)} />}
											</Col>
											<Col xs={6}>
												<FlatButton
													data-hint={help.button.inspectEntity}
													data-hintPosition="top-right"
													label="Inspect"
													href={Utils.getLink(`/details/${this.props.currentEntity.Id}/${childEntity.Id}`)} />
											</Col>
										</Row>
									</CardActions>
								</Card>
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