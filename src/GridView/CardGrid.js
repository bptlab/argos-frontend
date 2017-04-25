import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './CardGrid.css';

class CardGrid extends Component {
	render() {
		return (
			<div className="card-grid d-flex">
				{this.props.entities.map((entity) => {
					return (
						<Card className="card">
							<CardTitle title="Card Title" subtitle="Card subtitle"/>
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

export default CardGrid;