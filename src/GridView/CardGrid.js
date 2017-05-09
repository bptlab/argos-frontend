import React from 'react';
import {connect} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import LoadingAnimation from './../Utils/LoadingAnimation';
import { Row, Col } from 'react-grid-system';
import { css } from 'aphrodite';
import EntityInformation from './../DetailView/EntityInformation';
import config from './../config/config';
import AppStyles from './../AppStyles';

class CardGrid extends ConnectionComponent {

	backgroundColor (status) {
		return ({backgroundColor: config.status[status].color});
	}

	backgroundColorLight (status) {
		return ({backgroundColor: config.status[status].colorLight});
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
			<Row className={css(this.props.styles)}>
				{this.props.entities.value.map((childEntity, index) => {
					return (
						<Col key={index} xs={12} sm={4} md={3}>
							<Card>
								<CardTitle
									style={
										this.backgroundColor(childEntity.Status)
									}
									title={childEntity.Name}
									titleColor={config.colors.textAlternate}
									subtitle={this.props.entityType.name}/>
								<CardText
									style={
										this.backgroundColorLight(childEntity.Status)}>
									<EntityInformation entity={childEntity} styles={AppStyles.alternateTextColor}/>
								</CardText>
								<CardActions
									style={
										this.backgroundColorLight(childEntity.Status)
									}>
									<Row>
										<Col xs={6}>
											<FlatButton
												label="Children"
												href={`/grid/${childEntity.Id}`}/>
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