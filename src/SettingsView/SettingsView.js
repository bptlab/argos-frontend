import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


class SettingsView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
		};
	}

	handleExpandChange = (expanded) => {
		this.setState({expanded: expanded});
	};

	handleReduce = () => {
		this.setState({expanded: false});
	};
	render() {
		return (
			<div>
				<Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
					<CardHeader
						title="Event type title"
						subtitle="Event type description?"
						actAsExpander={true}
						showExpandableButton={true}
					/>
					<CardText expandable={true}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
						Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
						Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
					</CardText>
					<CardActions expandable={true}>
						<FlatButton
							label="Save"
							onTouchTap={this.handleReduce} />
						<FlatButton label="Abort" onTouchTap={this.handleReduce} />
					</CardActions>
				</Card>

				<Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
					<CardHeader
						title="Event type title"
						subtitle="Event type description?"
						actAsExpander={true}
						showExpandableButton={true}
					/>
					<CardText expandable={true}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
						Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
						Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
					</CardText>
					<CardActions expandable={true}>
						<FlatButton
							label="Save"
							onTouchTap={this.handleReduce} />
						<FlatButton label="Abort" onTouchTap={this.handleReduce} />
					</CardActions>
				</Card>
			</div>
		);
	}
}

export default SettingsView;
