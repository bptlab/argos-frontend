import React, {Component} from "react";
import {TextField} from "material-ui";
import config from "../config/config";

class EventQueryInputArea extends Component {
	render() {
		return (
			<div>
				<TextField
					floatingLabelText={config.descriptions.queryDescriptionInputFieldHint}
					name="event-query-description"
					multiLine={false}
					fullWidth={true}
					errorText={this.props.descriptionErrorMessae}
					onChange={this.props.handleDescriptionInputChange}
				/>
				<TextField
					floatingLabelText={config.descriptions.queryInputFieldHint}
					name="event-query"
					hintText={config.descriptions.exampleQuery}
					multiLine={true}
					fullWidth={true}
					errorText={this.props.queryErrorMessage}
					onChange={this.props.handleQueryInputChange}
				/>
			</div>
		);
	}
}

export default EventQueryInputArea;