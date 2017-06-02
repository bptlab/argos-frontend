import React, {Component} from "react";
import {TextField} from "material-ui";
import config from "../config/config";
import help from "../config/help";
import Utils from "../Utils/Utils";

class EventQueryInputArea extends Component {
	constructor(props) {
		super(props);
		this.getLoadedDescriptionValue = this.getLoadedDescriptionValue.bind(this);
		this.getEditablePartOfEventQuery = this.getEditablePartOfEventQuery.bind(this);
		this.getNotEditablePartOfEventQuery = this.getNotEditablePartOfEventQuery.bind(this);
		this.eventQuery = this.props.eventQuery;
	}

	getLoadedDescriptionValue() {
		if (this.eventQuery) {
			return this.eventQuery.Description;
		}
	}

	getEditablePartOfEventQuery() {
		if (this.eventQuery) {
			return Utils.splitStringAfterSubString(this.eventQuery.Query, "FROM ");
		}
	}

	getNotEditablePartOfEventQuery() {
		if (this.eventQuery) {
			return ": " + Utils.splitStringBeforeSubString(this.eventQuery.Query, "FROM ") + "FROM ";
		}
		return "";
	}

	componentWillMount() {
		if (this.eventQuery) {
			const eventDescription = {target: {value: this.eventQuery.Description}};
			this.props.handleDescriptionInputChange(eventDescription);
			const eventQuery = {target: {value: this.eventQuery.Query}};
			this.props.handleQueryInputChange(eventQuery);
		}
	}

	render() {
		const loadedDescriptionValue = this.getLoadedDescriptionValue();
		return (
			<div>
				<TextField
					data-hint={help.input.eventQueryView.description}
					data-hintPosition="middle-right"
					floatingLabelText={config.descriptions.queryDescriptionInputFieldHint}
					floatingLabelStyle={{color: config.colors.primaryDarkAlphaDarker}}
					name="event-query-description"
					multiLine={false}
					fullWidth={true}
					errorText={this.props.descriptionErrorMessage}
					onChange={this.props.handleDescriptionInputChange}
					defaultValue={loadedDescriptionValue}
				/>
				<TextField
					data-hint={help.input.eventQueryView.query}
					data-hintPosition="middle-right"
					floatingLabelText={config.descriptions.queryInputFieldHint + this.getNotEditablePartOfEventQuery()}
					floatingLabelStyle={{color: config.colors.primaryDarkAlphaDarker}}
					name="event-query"
					hintText={config.descriptions.exampleQuery}
					multiLine={true}
					rows={3}
					fullWidth={true}
					errorText={this.props.queryErrorMessage}
					onChange={this.props.handleQueryInputChange}
					defaultValue={this.getEditablePartOfEventQuery()}
				/>
			</div>
		);
	}
}

export default EventQueryInputArea;