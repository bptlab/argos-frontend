import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import { css } from 'aphrodite';

class EntityInformation extends Component {
    static generateListItem(attribute) {
		return <ListItem
			primaryText={attribute.primaryText}
			secondaryText={attribute.secondaryText}
		/>;
	}

	render() {
		return (
			<List className={css(this.props.styles)}>
				{
					this.props.attributes.map((attribute) => EntityInformation.generateListItem(attribute))
				}
			</List>
		);
	}
}

export default EntityInformation;