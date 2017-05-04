import React from 'react';
import { connect } from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import {List, ListItem} from 'material-ui/List';
import { css } from 'aphrodite';

class EntityInformation extends ConnectionComponent {
    static generateListItem(attribute, key) {
        return <ListItem
			key = {key}
			primaryText = {attribute.Name}
			secondaryText = {attribute.Value}
		/>;
    }

    render() {
        const entity = this.props.entity.value;
        const connectionIncomplete = super.render(this.props.entity);
        if(connectionIncomplete) {
            return connectionIncomplete;
        }
        return (
			<List className={css(this.props.styles)}>
                {
                    entity.Attributes.map((attribute, key) => EntityInformation.generateListItem(attribute, key))
                }
			</List>
        );
    }
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
    entity: `/entity/${props.entityId}`,
}))(EntityInformation);