import React, { Component } from 'react';
import {connect} from 'react-refetch';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import LoadingAnimation from './../Utils/LoadingAnimation';
import ErrorMessage from './../Utils/ErrorMessage';
import FlatButton from 'material-ui/FlatButton';
import './CardGrid.css';

class CardGrid extends Component {
	
	constructor(props) {
		super(props);
		const attributeNames = props.entity.Attributes.map((attribute) => {
			return attribute.Name;
		});
		this.props.lazyChildEntities(attributeNames.join("+"));
	}
	
	render() {
		if (this.props.childEntities.pending) {
			return <LoadingAnimation/>;
		} else if (this.props.childEntities.rejected) {
			return <ErrorMessage message={this.props.childEntities.reason}/>;
		} else if (this.props.childEntities.fulfilled) {
			return (
				<div className="card-grid d-flex">
					{this.props.childEntities.map((childEntity) => {
						return (
							<Card className="card">
								<CardTitle title={childEntity.Name} subtitle={this.props.childEntityType.name}/>
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
}

export default connect(props => ({
	lazyChildEntities: attributeList => ({
		childEntities: `/entity/${props.currentEntity.Id}/children/type/${props.childEntityType.Id}/${attributeList}`	
	})
}))(CardGrid);