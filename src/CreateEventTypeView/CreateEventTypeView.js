import React from 'react';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import TextField from 'material-ui/TextField';
import {Container} from "react-grid-system";
import RaisedButton from "material-ui/RaisedButton";
import IconSave from "material-ui/svg-icons/content/save";
import IconCancel from "material-ui/svg-icons/navigation/cancel";
import { Row, Col } from 'react-grid-system';
import Header from './../Header';
import {css} from "aphrodite";
import AppStyles from "./../AppStyles";


class CreateEventTypeView extends ConnectionComponent {
    constructor(props) {
        super(props);
        this.state = {
            attributes : [{id: '0', value: ''}],
            lastAttributeId: 0
        };
        this.nextAttributeId = 1;
    }

    onInputChange(event) {
        const currentAttributeId = event.target.id.toString();
        const updatedAttributes = this.state.attributes;
        const attributeIds = updatedAttributes.map(attribute => {
            return attribute.id;
        });
        const currentAttributeIndex = attributeIds.indexOf(currentAttributeId);

        if (!event.target.value) {
            updatedAttributes.splice(currentAttributeIndex, 1);
            this.setState({attributes: updatedAttributes});
            return;
        }

        updatedAttributes[currentAttributeIndex].value = event.target.value;

        if(parseInt(currentAttributeId, 10) === this.state.lastAttributeId) {
            const newAttributeId = this.nextAttributeId;
            this.nextAttributeId += 1;
            const newAttribute = {id: `${newAttributeId}`, value: ''};
            this.setState({
                attributes: updatedAttributes.concat([newAttribute]),
                lastAttributeId: newAttributeId
            });
        }
        else {
            this.setState({attributes: updatedAttributes});
        }
    }

    render() {
        return (
            <div>
                <Header title="Create New Event Type"/>
                <Container>
                    <div className={css(AppStyles.dFlex, AppStyles.elementMarginTop)}>
                        <Col>
                            <Row bottom="xs">
                                <Col>
                                    <TextField floatingLabelText="Event Type Name" fullWidth="true" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <TextField floatingLabelText="Timestamp Attribute" fullWidth="true"/>
                                </Col>
                            </Row>
                            <Row className={css(AppStyles.elementMarginTop)}>
                                <Col md={4}> Attributes: </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {this.state.attributes.map((attribute) =>
                                        <TextField
                                            key={attribute.id}
                                            id={attribute.id}
                                            value={attribute.value}
                                            hintText="Attribute Name"
                                            onChange={this.onInputChange.bind(this)}
                                            fullWidth="true"/>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </div>
                    <div className={css(AppStyles.textAlignCenter)}>
                       <RaisedButton
                           label="Abort"
                           icon={<IconCancel/>}
                           className={css(AppStyles.marginAllSites)}
                           secondary={true} />
                        <RaisedButton
                            label="Save"
                            icon={<IconSave/>}
                            className={css(AppStyles.marginAllSites)}
                            primary={true} />
                    </div>
                </Container>
            </div>
        );
    }
}

export default CreateEventTypeView;
