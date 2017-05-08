import React, {Component} from "react";
import {TextField} from "material-ui";
import config from "../config/config";

class EventQueryInputArea extends Component {
    render() {
        return (
            <TextField
                name="event-query"
                hintText={config.descriptions.exampleQuery}
                multiLine={true}
                fullWidth={true}
            />
        );
    }
}

export default EventQueryInputArea;