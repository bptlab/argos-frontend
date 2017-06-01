import React, {Component} from "react";
import {List, ListItem} from "material-ui/List";
import {css} from "aphrodite";
import {Card, CardText, CardTitle} from "material-ui";
import AppStyles from "../AppStyles";
import FilterListIcon from 'material-ui/svg-icons/device/widgets';

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
                <CardTitle className={css(AppStyles.textAlignCenter, AppStyles.fontSize24)}>
                    Available Attributes
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