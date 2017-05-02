import React from 'react';
import {connect} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import LoadingAnimation from './../Utils/LoadingAnimation';
import { Row, Col } from 'react-grid-system';

class CardGrid extends ConnectionComponent {
	
	render() {
		if(!this.props.entities) {
			return <LoadingAnimation/>;
		}
		const connectionIncomplete = super.render(this.props.entities);
		if(connectionIncomplete) {
			return connectionIncomplete;
		}
		return (
			<Row>
				{this.props.entities.value.map((childEntity, index) => {
					return (
						<Col xs={12} sm={4} md={3}>
							<Card key={index}>
								<CardTitle
									title={childEntity.Name}
									subtitle={this.props.entityType.name}/>
								<CardText>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
									Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
									Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
								</CardText>
								<CardActions>
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
		url: `/entityType/${props.entityType.Id}/attributes`,
		then: attributes => 
			`/entity/${props.currentEntity.Id}/children/type/${props.entityType.Id}/${attributes.join("+")}`,
	}
}))(CardGrid);