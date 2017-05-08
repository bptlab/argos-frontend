import React from 'react';
import {connect} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import {Col, Container, Row} from "react-grid-system";
import Header from './../Header';
import {RaisedButton} from "material-ui";
import IconSave from "material-ui/svg-icons/content/save";
import IconCancel from "material-ui/svg-icons/navigation/cancel";
import EventTypeInformation from "./EventTypeInformation";
import EventQueryInputArea from "./EventQueryInputArea";
import config from "../config/config";
import { css } from 'aphrodite';
import AppStyles from "../AppStyles";

class CreateEventQueryView extends ConnectionComponent {

    render() {
        const connectionIncomplete = super.render(this.props.attributes);
        if(connectionIncomplete) {
            return connectionIncomplete;
        }
        return (
            <div>
                <Header title={"Create Event Query for Test"}/>
                <Container>
                    <Row>
                        <Col md={4}>
                            <EventTypeInformation attributes={this.props.attributes.value}/>
                        </Col>
                        <Col md={8}>
                            <EventQueryInputArea/>
                        </Col>
                    </Row>
                    <div className={css(AppStyles.textAlignCenter)}>
                        <RaisedButton
                            label="Abort"
                            icon={<IconCancel/>}
                            className={css(AppStyles.marginAllSites)}
                            secondary={true}
                        />
                        <RaisedButton
                            label="Save"
                            icon={<IconSave/>}
                            className={css(AppStyles.marginAllSites)}
                            primary={true}
                        />
                    </div>
                </Container>
            </div>
        );
    }
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
    attributes: config.backendRESTRoute + `/eventtype/99101991/attributes`,
}))(CreateEventQueryView);
