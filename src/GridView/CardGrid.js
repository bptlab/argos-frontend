import React from 'react';
import {connect} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import LoadingAnimation from './../Utils/LoadingAnimation';
import { Row, Col } from 'react-grid-system';
import { css } from 'aphrodite';
import AppStyles from "./../AppStyles";
import EntityInformation from './../DetailView/EntityInformation';
import StatusDiagram from "./StatusDiagram";
import config from './../config/config';
import Utils from './../Utils/Utils';

class CardGrid extends ConnectionComponent {

	backgroundColor (status) {
		if (Utils.getStatus(status)) {
			return ({backgroundColor: Utils.getStatus(status).color});
		}
		else {
			return {backgroundColor: Utils.getStatus("UNDEFINED").color};
		}
	}

	backgroundColorLight (status) {
		if (Utils.getStatus(status)) {
			return ({backgroundColor: Utils.getStatus(status).colorLight});
		}
		else {
			return {backgroundColor: Utils.getStatus("UNDEFINED").colorLight};
		}
	}

	render() {
		if(!this.props.entities) {
			return <LoadingAnimation/>;
		}
		const connectionIncomplete = super.render(this.props.entities);
		if(connectionIncomplete) {
			return connectionIncomplete;
		}
		return (
			<div>
				<StatusDiagram
					entities={this.props.entities}
					styles={[AppStyles.elementMarginTop]} />
				<Row className={css(this.props.styles)}>
					{this.props.entities.value.map((childEntity, index) => {
						return (
							<Col key={index} xs={12} sm={4} md={3}>
								<Card>
									<CardTitle
										style={this.backgroundColor(childEntity.Status)}
										title={childEntity.Name}
										titleColor={config.colors.textAlternate}
										subtitle={this.props.entityType.name}/>
									<CardText style={this.backgroundColorLight(childEntity.Status)}>
										<EntityInformation entity={childEntity} />
									</CardText>
									<CardActions style={this.backgroundColorLight(childEntity.Status)}>
										<Row>
											<Col xs={6}>
												{childEntity.HasChildren &&
													<FlatButton
														label="Children"
														href={`/grid/${childEntity.Id}`}/>}
											</Col>
											<Col xs={6}>
												<FlatButton
													label="Inspect"
													href={`/details/${this.props.currentEntity.Id}/${childEntity.Id}`}/>
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

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
	entities: {
		url: config.backendRESTRoute + `/entitytype/${props.entityType.Id}/attributes`,
		then: attributes =>
			config.backendRESTRoute
			+ `/entity/${props.currentEntity.Id}/children/type/${props.entityType.Id}/${attributes.map(
				attribute => {return attribute.Name;}
			).join("+")}`,
	}
}))(CardGrid);