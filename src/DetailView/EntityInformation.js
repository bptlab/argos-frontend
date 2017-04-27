import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import { css } from 'aphrodite';

class EntityInformation extends Component {
	render() {
		return (
			<List className={css(this.props.styles)}>
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