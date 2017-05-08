import React from 'react';
import {Container} from "react-grid-system";
import {connect} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import Header from './../Header';
import config from "../config/config";
import EventTypeInformation from "./EventTypeInformation";
import EventQueryInputArea from "./EventQueryInputArea";
import {RaisedButton} from "material-ui";
import IconSave from "material-ui/svg-icons/content/save";
import IconCancel from "material-ui/svg-icons/navigation/cancel";

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
                    <EventTypeInformation attributes={this.props.attributes.value}/>
                    <EventQueryInputArea/>
                    <RaisedButton label="Abort" icon={<IconCancel/>}/>
                    <RaisedButton label="Save" icon={<IconSave/>}/>
                </Container>
            </div>
        );
    }
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
    attributes: config.backendRESTRoute + `/eventtype/99101991/attributes`,
}))(CreateEventQueryView);
