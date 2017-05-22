import React, {Component} from "react";
import {List, ListItem} from "material-ui/List";
import {css} from "aphrodite";

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
			<List className={css(this.props.styles)}>
                {
	                this.props.entity.Attributes.map((attribute, key) => EntityInformation.generateListItem(attribute, key))
                }
			</List>
        );
    }
}

export default EntityInformation;