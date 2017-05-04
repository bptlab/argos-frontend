import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {Container} from "react-grid-system";
import RaisedButton from "material-ui/RaisedButton";
import IconSave from "material-ui/svg-icons/content/save";
import Header from './../Header';


class NewEventTypeView extends Component {

    render() {
        return (
            <div>
                <Header title="Create New Event Type"/>
                <Container>
                    <TextField hintText="Event Type Name"/><br/>
                    <TextField hintText="Attribute Name"/><br/>
                    <TextField hintText="Attribute Name"/><br/>
                    <TextField hintText="Attribute Name"/><br/>
                    <TextField hintText="Attribute Name"/><br/>
                    <RaisedButton label="Save" icon={<IconSave/>}/>
                </Container>
            </div>
        );
    }
}

export default NewEventTypeView;
