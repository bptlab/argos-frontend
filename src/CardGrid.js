import React, { Component } from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import './CardGrid.css';

class GridView extends Component {
	render() {
		return (
			<div className="card-grid">
				<Card>
					<CardTitle title="Card title" subtitle="Card subtitle" />
					<CardText>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
						Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
						Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
					</CardText>
				</Card>
				<Card>
					<CardTitle title="Card title" subtitle="Card subtitle" />
					<CardText>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
						Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
						Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
					</CardText>
				</Card>
				<Card>
					<CardTitle title="Card title" subtitle="Card subtitle" />
					<CardText>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
						Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
						Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
					</CardText>
				</Card>
			</div>
		);
	}
}

export default GridView;