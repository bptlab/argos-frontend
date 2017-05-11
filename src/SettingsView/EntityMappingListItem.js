import React from 'react';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import config from './../config/config.js';
import { Row, Col } from 'react-grid-system';
import IconButton from 'material-ui/IconButton';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconDelete from 'material-ui/svg-icons/action/delete';
import { ListItem } from 'material-ui/List';
import {PromiseState} from 'react-refetch';

class EntityMappingListItem extends ConnectionComponent {

    constructor() {
        super();
        this.getEntityTypeName = this.getEntityTypeName.bind(this);
        this.getEntityTypeAttributeName = this.getEntityTypeAttributeName.bind(this);
    }


    getEntityTypeName() {
        return this.props.getEntityTypeName(this.props.mapping.EntityTypeId);
    }

    getEntityTypeAttributeName(attributeId) {
        const searchedAttribute = this.props.entityTypeAttributes.value.find(attribute => {
            return attribute.Id === attributeId;
        });
        return searchedAttribute.Name;
    }

    getEventTypeAttributeName(attributeId) {
        const searchedAttribute = this.props.eventTypeAttributes.find(attribute => {
            return attribute.Id === attributeId;
        });
        return searchedAttribute.Name;
    }

    render() {
        const allFetches = PromiseState.all([this.props.entityTypeAttributes]);
        const connectionIncomplete = super.render(allFetches);
        if(connectionIncomplete) {
            return connectionIncomplete;
        }

        return (
            <ListItem>
                <Row>
                    <Col md={10}>
                {this.props.eventType.Name} - {this.getEntityTypeName()}
                    </Col>
                    <Col md={2}>
                    <IconButton><IconEdit/></IconButton>
                    <IconButton><IconDelete/></IconButton>
                    </Col>
                </Row>
                <Row>
                    <Col offset={{md: 1}}>
                        {this.props.mapping.EventEntityMappingConditions.map((condition) => {
                            return(
                                <div key={condition.EntityTypeAttributeId}>
                                    {this.getEventTypeAttributeName(condition.EventTypeAttributeId)}
                                     -
                                    {this.getEntityTypeAttributeName(condition.EntityTypeAttributeId)}
                                </div>
                            );
                        })}
                    </Col>
                </Row>
            </ListItem>
        )
    }
}

export default ConnectionComponent.argosConnector()(props => ({
    entityTypeAttributes: config.backendRESTRoute + `/entitytype/${props.mapping.EntityTypeId}/attributes`
}))(EntityMappingListItem);