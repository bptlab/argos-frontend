import React, {Component} from "react";
import {List, ListItem} from "material-ui/List";
import {css} from "aphrodite";
import help from "./../config/help.js";

class EntityInformation extends Component {
	static generateListItem(attribute, key) {
		return <ListItem
			key={key}
			primaryText={attribute.Name}
			secondaryText={attribute.Value}
			disabled={true}
		/>;
	}

	render() {
		return (
			<List
				data-hint={help.display.entityAttributes}
				data-hintPosition="middle-left"
				className={css(this.props.styles)}>
				{
					this.props.entity.Attributes.map((attribute, key) => EntityInformation.generateListItem(attribute, key))
				}
			</List>
		);
	}
}

export default EntityInformation;