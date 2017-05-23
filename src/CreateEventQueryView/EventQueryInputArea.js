import React, {Component} from "react";
import {TextField} from "material-ui";
import config from "../config/config";
import Utils from "../Utils/Utils";

class EventQueryInputArea extends Component {
	constructor(props) {
		super(props);
		this.setLoadedDescriptionValue = this.setLoadedDescriptionValue.bind(this);
		this.setEditablePartOfEventQuery = this.setEditablePartOfEventQuery.bind(this);
		this.setNotEditablePartOfEventQuery = this.setNotEditablePartOfEventQuery.bind(this);
	}

	setLoadedDescriptionValue() {
        if (this.props.eventQuery) {
			return this.props.eventQuery.Description;
		}
	}

    setEditablePartOfEventQuery() {
        if (this.props.eventQuery) {
			return Utils.splitStringAfterSubString(this.props.eventQuery.Query, "FROM ");
        }
    }

    setNotEditablePartOfEventQuery() {
        if (this.props.eventQuery) {
            return ": " + Utils.splitStringBeforeSubString(this.props.eventQuery.Query, "FROM ") + "FROM ";
        }
	}

	render() {
		const loadedDescriptionValue = this.setLoadedDescriptionValue();
		return (
			<div>
				<TextField
					floatingLabelText={config.descriptions.queryDescriptionInputFieldHint}
					name="event-query-description"
					multiLine={false}
					fullWidth={true}
					errorText={this.props.descriptionErrorMessage}
					onChange={this.props.handleDescriptionInputChange}
					defaultValue={loadedDescriptionValue}
				/>
				<TextField
					floatingLabelText={config.descriptions.queryInputFieldHint + this.setNotEditablePartOfEventQuery()}
					name="event-query"
					hintText={config.descriptions.exampleQuery}
					multiLine={true}
					fullWidth={true}
					errorText={this.props.queryErrorMessage}
					onChange={this.props.handleQueryInputChange}
					defaultValue={this.setEditablePartOfEventQuery()}
				/>
			</div>
		);
	}
}

export default EventQueryInputArea;