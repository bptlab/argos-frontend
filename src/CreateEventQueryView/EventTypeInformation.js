import React, {Component} from "react";
import {List, ListItem} from "material-ui/List";
import {Card, CardText, CardTitle} from "material-ui";
import "./../App.css";
import FilterListIcon from 'material-ui/svg-icons/device/widgets';
import help from "../config/help";

class EventTypeInformation extends Component {
    static generateListItem(attribute, key) {
        return <ListItem
            key={key}
            leftIcon={<FilterListIcon />}
            primaryText={attribute.Name}
        />;
    }

    render() {
        return (
            <Card>
                <CardTitle className="textAlignCenter fontSize24">
                    {help.descriptions.availableAttributes}
                </CardTitle>
                <CardText>
                    <List>
                        {this.props.attributes.map(
                            (attribute, key) => EventTypeInformation.generateListItem(attribute, key)
                        )}
                    </List>
                </CardText>
            </Card>
        );
    }
}

export default EventTypeInformation;