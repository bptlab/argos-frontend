import React, { Component } from 'react';
import {connect, PromiseState} from 'react-refetch';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './CardGrid.css';

class CardGrid extends Component {
	
	constructor(props) {
		super(props);
		const attributeNames = props.entity.Attributes.map((attribute) => {
			return attribute.Name;
		});
		this.attributesList = attributeNames.join("+");
	}
	
	render() {
		return (
			<div className="card-grid d-flex">
				{this.props.lazyChildEntities(this.attributesList).map((childEntity) => {
					return (
						<Card className="card">
							<CardTitle title={childEntity.Name} subtitle={this.props.childEntityType.name} />
							<CardText>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
								Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
								Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
							</CardText>
							<CardActions className="d-flex">
								<FlatButton label="Children" className="card-button"/>
								<FlatButton label="Inspect" className="card-button"/>
							</CardActions>
						</Card>
					);
				})}
			</div>
		);
	}
}

export default connect(props => ({
	lazyChildEntities: attributeList => ({
		childEntities: `/entity/${props.currentEntity.Id}/children/type/${props.childEntityType.Id}/${attributeList}`	
	})
}))(CardGrid);