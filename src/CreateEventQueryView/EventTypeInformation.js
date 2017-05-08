import React, {Component} from "react";
import {List, ListItem} from "material-ui/List";
import {css} from "aphrodite";

class EventTypeInformation extends Component {
    static generateListItem(attribute, key) {
        return <ListItem
            key={key}
            primaryText={attribute.Name}
        />;
    }

    render() {
        return (
            <List className={css(this.props.styles)}>
                {this.props.attributes.map(
                    (attribute, key) => EventTypeInformation.generateListItem(attribute, key)
                )}
            </List>
        );
    }
}

export default EventTypeInformation;