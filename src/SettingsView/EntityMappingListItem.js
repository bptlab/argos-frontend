import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import IconButton from 'material-ui/IconButton';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconDelete from 'material-ui/svg-icons/action/delete';
import { ListItem } from 'material-ui/List';

class EntityMappingListItem extends Component {

    constructor() {
        super();
        this.getEntityTypeName = this.getEntityTypeName.bind(this);
        this.getTypeAttributeName = this.getTypeAttributeName.bind(this);
    }


    getEntityTypeName() {
        return this.props.getEntityTypeName(this.props.mapping.EntityTypeId);
    }

    getTypeAttributeName(id) {
        return this.props.getTypeAttributeName(id);
    }

    render() {
        return (
            <ListItem>
                <Row>
                {this.props.eventType.Name} - {this.getEntityTypeName()}
                    <IconButton><IconEdit/></IconButton>
                    <IconButton><IconDelete/></IconButton>
                </Row>
                <Row>
                    <Col offset={{md: 1}}>
                        {this.props.mapping.EventEntityMappingConditions.map((condition) => {
                            return(
                                <div key={condition.EntityTypeAttributeId}>
                                    {/*{this.getTypeAttributeName(condition.EventTypeAttributeId)}
                                    -
                                    {this.getTypeAttributeName(condition.EntityTypeAttributeId)}*/}
                                </div>
                            )
                        })}
                    </Col>
                </Row>
            </ListItem>
        )
    }
}

export default EntityMappingListItem;