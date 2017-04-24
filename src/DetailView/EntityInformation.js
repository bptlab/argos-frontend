import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';

class EntityInformation extends Component {
	render() {
		return (
			<List>
				<ListItem
					primaryText="Attribute value"
					secondaryText="Entity attribute title"
				/>
				<ListItem
					primaryText="Attribute value"
					secondaryText="Entity attribute title"
				/>
				<ListItem
					primaryText="Attribute value"
					secondaryText="Entity attribute title"
				/>
			</List>
		);
	}
}

export default EntityInformation;