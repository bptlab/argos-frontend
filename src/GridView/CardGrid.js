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

class CardGrid extends ConnectionComponent {
	backgroundColor (status) {
		if (status in config.status) {
			return ({backgroundColor: config.status[status].color});
		}
		else {
			return {backgroundColor: config.status["UNDEFINED"].color};
		}
	}

	backgroundColorLight (status) {
		if (status in config.status) {
			return ({backgroundColor: config.status[status].colorLight});
		}
		else {
			return {backgroundColor: config.status["UNDEFINED"].colorLight};
		}
	}

	isCoveredByFilter(childEntity) {
		// every is equivalent to logical and over an array
		return this.props.filter.every((filter) => {
			return this.testFilter(childEntity, filter);
		});
	}

	testFilter(childEntity, filter) {
		if (!filter.value) {
		 	return true;
		 }
		 const attributeValues = this.getAttributeValues(childEntity);

		if (this.doesContain(childEntity.Name, filter.value)){
			return true;
		}
		else {
			return this.doesContain(attributeValues, filter.value);
		}
	}

	doesContain(baseValue, subValue) {
		return (baseValue.toString().toLowerCase().indexOf(subValue.toString().toLowerCase()) > -1);
	}

	getAttributeValues(childEntity){
		const attributeArray = [];
		childEntity.Attributes.forEach((attribute) => {
			attributeArray.push(attribute.Value)
		});
		return 	attributeArray;
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
					if (!this.isCoveredByFilter(childEntity)) {
						return "";
					}
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