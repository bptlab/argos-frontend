import Header from "../Header";
import React from "react";
import Utils from "../Utils/Utils";
import {Col, Container} from "react-grid-system";
import queryString from "query-string";
import "./../App.css";
import AttributeDistributionDiagram from "./AttributeDistributionDiagram";
import {Card, CardText, CardTitle} from "material-ui";
import ConnectionComponent from "../Utils/ConnectionComponent";
import config from "../config/config";
import help from "../config/help";

class AnalyticsView extends ConnectionComponent {
	static renderAttributeDistributionDiagram(key, attributeDistribution, attributeName) {
		return (
			<Col key={key} md={6}>
				<Card>
					<CardTitle title={help.descriptions.attributeDistributionDiagramName + attributeName}/>
					<CardText>
						<AttributeDistributionDiagram
							attributeValues={Object.keys(attributeDistribution)}
							numberOfOccurrences={Object.values(attributeDistribution)}/>
					</CardText>
				</Card>
			</Col>
		);
	}

	render() {
		const information = queryString.parse(this.props.location.search);
		const diagrams = [];
		const diagramTypes = JSON.parse(information.types);
		diagramTypes.forEach((type, key) => {
			if (type === "attribute-distribution" && information.eventTypeId
				&& information.entityId && information.attributeName) {
					const connectionIncomplete = super.render(this.props.events);
					if (connectionIncomplete) {
						diagrams.push(<div key={key}>{connectionIncomplete}</div>);
					} else {
						const attributeDistribution = Utils.getAttributeValueDistribution(
							this.props.events.value, information.attributeName);
						diagrams.push(
							AnalyticsView.renderAttributeDistributionDiagram(
								key, attributeDistribution, information.attributeName));
					}
				} else {
					diagrams.push(<div>{help.messages.missingData}</div>);
				}
			}
		);
		return (
			<div>
				<Header title={help.descriptions.analyticsView}/>
				<Container className="containerMarginTop">
					{diagrams}
				</Container>
			</div>
		);
	}
}

export default ConnectionComponent.argosConnector()(() => {
	const information = queryString.parse(location.search);
	return {
		events: {
			url: config.backendRESTRoute
			+ `/entity/${information.entityId}/eventtype/${information.eventTypeId}
						/events/true/0/10000000`,
			force: true,
			refreshing: true
		}
	};
})(AnalyticsView);
