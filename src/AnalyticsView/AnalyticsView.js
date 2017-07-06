import Header from "../Header";
import React from "react";
import Utils from "../Utils/Utils";
import {Col, Container, Row} from "react-grid-system";
import {css} from 'aphrodite';
import queryString from "query-string";
import AppStyles from "../AppStyles";
import AttributeDistributionDiagram from "../DetailView/AttributeDistributionDiagram";
import {Card, CardText, CardTitle} from "material-ui";
import ConnectionComponent from "../Utils/ConnectionComponent";
import config from "../config/config";

class AnalyticsView extends ConnectionComponent {
	render() {
		const information = queryString.parse(this.props.location.search);
		const diagrams = [];
		const diagramTypes = JSON.parse(information.types);
		diagramTypes.forEach((type, key) => {
			if (type === "attribute-distribution") {
				if (information.eventTypeId && information.entityTypeId && information.attributeName) {
					const connectionIncomplete = super.render(this.props.events);
					if (connectionIncomplete) {
						diagrams.push(<div key={key} />);
					} else {
						console.log(this.props.events.value);
						const attributeDistribution = Utils.getAttributeValueDistribution(Utils.getListOfAttributeValues(this.props.events.value, information.attributeName));
						diagrams.push(<Col key={key} md={6}><Card><CardTitle
							title="Attribute Distribution"/><CardText><AttributeDistributionDiagram
							attributeValues={Object.keys(attributeDistribution)}
							numberOfOccurrences={Object.values(attributeDistribution)}/></CardText></Card></Col>);
					}
				} else {
					diagrams.push(<div>The requested diagram cannot be displayed due to lack of data.</div>);
				}
			}
		});
		return (
			<div>
				<Header title={"Analytics"}/>
				<Container className={css(AppStyles.containerMarginTop)}>
					<Row>
						{diagrams}
					</Row>
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
			+ `/entity/${information.entityTypeId}/eventtype/${information.eventTypeId}
						/events/true/0/10000000`,
			force: true,
			refreshing: true
		}
	};
})(AnalyticsView);
