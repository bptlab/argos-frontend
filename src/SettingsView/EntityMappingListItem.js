import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import IconButton from 'material-ui/IconButton';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconDelete from 'material-ui/svg-icons/action/delete';

class EntityMappingListItem extends Component {

    constructor() {
        super();
        this.getEntityTypeName = this.getEntityTypeName.bind(this);
        this.getTypeAttributeName = this.getTypeAttributeName.bind(this);
    }


    getEntityTypeName() {
        // TODO
    }

    getTypeAttributeName(id) {
        this.props.getTypeAttributeName(id);
    }

    render() {
        return (
            <div>
                <Row>
                {this.props.eventType.Name} - {this.getEntityTypeName()}
                    <IconButton><IconEdit/></IconButton>
                    <IconButton><IconDelete/></IconButton>
                </Row>
                <Row>
                    <Col offset-md={1}>
                        {this.props.mapping.EventEntityMappingConditions.map((condition) => {
                            return(
                                <div>
                                    {/*{this.getTypeAttributeName(condition.EventTypeAttributeId)}
                                    -
                                    {this.getTypeAttributeName(condition.EntityTypeAttributeId)}*/}
                                </div>
                            )
                        })}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default EntityMappingListItem;