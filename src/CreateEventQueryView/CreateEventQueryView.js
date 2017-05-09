import React from 'react';
import {connect, PromiseState} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import {Col, Container, Row} from "react-grid-system";
import {RaisedButton} from "material-ui";
import IconSave from "material-ui/svg-icons/content/save";
import IconCancel from "material-ui/svg-icons/navigation/cancel";
import Header from './../Header';
import { css } from 'aphrodite';
import EventTypeInformation from "./EventTypeInformation";
import EventQueryInputArea from "./EventQueryInputArea";
import config from "../config/config";
import AppStyles from "../AppStyles";

class CreateEventQueryView extends ConnectionComponent {

    static getButtons() {
        return (<div className={css(AppStyles.textAlignCenter)}>
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
        </div>);
    }

    render() {
        const allFetches = PromiseState.all([this.props.eventType, this.props.attributes]);
        const eventType = this.props.eventType.value;
        const attributes = this.props.attributes.value;
        const connectionIncomplete = super.render(allFetches);
        if(connectionIncomplete) {
            return connectionIncomplete;
        }
        return (
            <div>
                <Header title={"Create Event Query for " + eventType.Name}/>
                <div className={AppStyles.elementMarginTop}>
                    <Container>
                        <Row>
                            <Col md={4}>
                                <EventTypeInformation attributes={attributes}/>
                            </Col>
                            <Col md={8}>
                                <EventQueryInputArea/>
                            </Col>
                        </Row>
                        {CreateEventQueryView.getButtons()}
                    </Container>
                </div>
            </div>
        );
    }
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
    eventType: config.backendRESTRoute + `/eventtype/${props.match.params.eventTypeId}`,
    attributes: config.backendRESTRoute + `/eventtype/${props.match.params.eventTypeId}/attributes`,
}))(CreateEventQueryView);
