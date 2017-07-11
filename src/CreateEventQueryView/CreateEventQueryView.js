import React from "react";
import {PromiseState} from "react-refetch";
import ConnectionComponent from "./../Utils/ConnectionComponent.js";
import {Col, Container, Row} from "react-grid-system";
import {Paper, RaisedButton} from "material-ui";
import IconSave from "material-ui/svg-icons/content/save";
import IconCancel from "material-ui/svg-icons/navigation/cancel";
import Header from "./../Header";
import {css} from "aphrodite";
import EventTypeInformation from "./EventTypeInformation";
import EventQueryInputArea from "./EventQueryInputArea";
import config from "../config/config";
import help from "../config/help";
import AppStyles from "../AppStyles";
import Utils from "../Utils/Utils";
import LoadingAnimation from "../Utils/LoadingAnimation";
import Notification from "../Utils/Notification";

class CreateEventQueryView extends ConnectionComponent {

	constructor(props) {
		super(props);
		this.state = {
			query: '',
			queryErrorMessage: '',
			queryDescription: '',
			descriptionErrorMessage: ''
		};
		this.isCreateView = typeof this.props.match.params.eventQueryId === 'undefined';
		this.latestNotificationShown = false;
		this.handleCreateQueryInput = this.handleCreateQueryInput.bind(this);
		this.handleEditQueryInput = this.handleEditQueryInput.bind(this);
		this.isInvalidInput = this.isInvalidInput.bind(this);
		this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
		this.submitNewQuery = this.submitNewQuery.bind(this);
		this.submitUpdatedQuery = this.submitUpdatedQuery.bind(this);
		this.getComponentBody = this.getComponentBody.bind(this);
	}

	// handles query changes in create view
	handleCreateQueryInput(event) {
		this.setState({
			query: event.target.value,
			queryErrorMessage: ''
		});
	}

	// handles query changes in edit view, does a little string manipulation
	handleEditQueryInput(event) {
		const oldQuery = this.state.query;
		if (oldQuery !== "") {
			const uneditableQueryPart = Utils.splitStringBeforeSubString(oldQuery, "FROM ");
			this.setState({
				query: uneditableQueryPart + "FROM " + event.target.value,
				queryErrorMessage: ''
			});
		} else {
			this.setState({
				query: this.props.eventQuery.value.Query
			});
		}
	}

	handleDescriptionInput(event) {
		this.setState({
			queryDescription: event.target.value,
			descriptionErrorMessage: ''
		});
	}

	isInvalidInput() {
		let validationErrorOccured = false;
		if(!this.state.queryDescription) {
			this.setState({
				descriptionErrorMessage: help.messages.requiredFieldMessage
			});
			validationErrorOccured = true;
		}
		if(!this.state.query) {
			this.setState({
				queryErrorMessage: help.messages.requiredFieldMessage
			});
			validationErrorOccured = true;
		}
		return validationErrorOccured;
	}

	// submit handler for the create view
	submitNewQuery() {
		if (!this.isInvalidInput()) {
			this.props.createEventQuery({
				EventTypeId: this.props.match.params.eventTypeId,
				Description: this.state.queryDescription,
				Query: this.state.query
			});
			Notification.addSnackbarNotificationOnReferrer(help.messages.createdQueryMessage,
				Notification.ModeEnum.SUCCESS);
		}
		this.latestNotificationShown = false;
	}

	// submit handler for the edit view
	submitUpdatedQuery() {
		if (!this.isInvalidInput()) {
			this.props.editEventQuery({
				Description: this.state.queryDescription,
				Query: this.state.query
			});
			Notification.addSnackbarNotificationOnReferrer(help.messages.updatedQueryMessage,
				Notification.ModeEnum.SUCCESS);
		}
		this.latestNotificationShown = false;
	}
	
	abort() {
		window.history.back();
	}

	static handleOptionalActions(optionalActions) {
		if(optionalActions && optionalActions.fulfilled) {
			window.history.back();
			return null;
		}
	}

	displayOptionalErrorMessage(optionalActions) {
		if (optionalActions && optionalActions.rejected && !this.latestNotificationShown) {
			Notification.addSnackbarNotificationOnSelf(optionalActions.reason,
				Notification.ModeEnum.ERROR);
			this.latestNotificationShown = true;
		}
	}

	getAbortButton() {
		return <RaisedButton
			label={help.descriptions.abort}
			icon={<IconCancel/>}
			className={css(AppStyles.marginAllSites)}
			secondary={true}
			onClick={this.abort}
		/>;
	}

	/**
	 * Returns the body of the component to render. Fills some handlers and values.
	 * @param attributes - attributes of the event type
	 * @param queryInputChangeHandler - handler that is called when the query input field is changed
	 * @param submitFormHandler - handler that is called on submit of the form
	 * @param optionalActions - optional actions to evaluate
	 * @param eventQuery (optional) - used to fill default values in edit view
	 * @returns {XML}
	 */
	getComponentBody(attributes, queryInputChangeHandler, submitFormHandler, optionalActions, eventQuery) {
		this.displayOptionalErrorMessage(optionalActions);
		return (
			<div className={AppStyles.elementMarginTop}>
				<Container className={css(AppStyles.containerMarginTop)}>
					<Paper className={css(AppStyles.paperPadding)} zDepth={2}>
						<Row>
							<Col md={8}>
								<EventQueryInputArea
									handleQueryInputChange={queryInputChangeHandler}
									queryErrorMessage={this.state.queryErrorMessage}
									handleDescriptionInputChange={this.handleDescriptionInput}
									descriptionErrorMessage={this.state.descriptionErrorMessage}
									eventQuery={eventQuery}
								/>
							</Col>
							<Col md={4} style={{paddingTop: 20}}>
								<EventTypeInformation attributes={attributes}/>
							</Col>
						</Row>
						<Row>
							<Col md={8}>
								<div className={css(AppStyles.textAlignCenter)}>
									{this.getAbortButton()}
									<RaisedButton
										label={help.descriptions.save}
										icon={<IconSave/>}
										className={css(AppStyles.marginAllSites)}
										primary={true}
										onClick={submitFormHandler}
									/>
								</div>
							</Col>
						</Row>
					</Paper>
				</Container>
			</div>
		);
	}

	componentWillMount() {
		if (!this.isCreateView) {
			this.props.lazyLoadEventQuery();
		}
	}

	// render method for the create event query view
	renderCreateEventQuery() {
		const optionalActions = this.props.createEventQueryResponse;
		CreateEventQueryView.handleOptionalActions(optionalActions);
		const allFetches = PromiseState.all([this.props.eventType, this.props.attributes]);
		const connectionIncomplete = super.render(allFetches);
		if (connectionIncomplete) {
			return connectionIncomplete;
		}
		const eventType = this.props.eventType.value;
		const attributes = this.props.attributes.value;
		return (
			<div>
				<Header title={help.descriptions.createEventQueryView + " " + eventType.Name}/>
				{this.getComponentBody(attributes, this.handleCreateQueryInput, this.submitNewQuery, optionalActions)}
			</div>
		);
	}

	// is called to load the existing query in the edit view
	eventQueryPending() {
		if (!this.props.eventQuery) {
			return <LoadingAnimation />;
		}
		const eventQueryConnection = super.render(this.props.eventQuery);
		if (eventQueryConnection) {
			return eventQueryConnection;
		}
		if (!this.props.eventQuery.value) {
			return <LoadingAnimation />;
		}
		return null;
	}

	// render method for the edit event query view
	renderEditEventQuery() {
		const optionalActions = this.props.editEventQueryResponse;
		CreateEventQueryView.handleOptionalActions(optionalActions);
		const eventQueryPending = this.eventQueryPending();
		if (eventQueryPending) {
			return eventQueryPending;
		}
		const allFetches = PromiseState.all([this.props.eventType, this.props.attributes]);
		const connectionIncomplete = super.render(allFetches);
		if (connectionIncomplete) {
			return connectionIncomplete;
		}
		const eventType = this.props.eventType.value;
		const attributes = this.props.attributes.value;
		return (
			<div>
				<Header title={help.descriptions.editEventQueryView + " " + eventType.Name}/>
				{this.getComponentBody(
					attributes, this.handleEditQueryInput,
					this.submitUpdatedQuery, optionalActions, this.props.eventQuery.value
				)}
			</div>
		);
	}

	render() {
		if (this.isCreateView) {
			return this.renderCreateEventQuery();
		}
		return this.renderEditEventQuery();
	}
}

export default ConnectionComponent.argosConnector({fetch: ConnectionComponent.switchFetch})(props => ({
	eventType: config.backendRESTRoute + `/eventtype/${props.match.params.eventTypeId}`,
	attributes: config.backendRESTRoute + `/eventtype/${props.match.params.eventTypeId}/attributes`,
	lazyLoadEventQuery: () => ({
		eventQuery: config.backendRESTRoute + `/eventquery/${props.match.params.eventQueryId}`,
	}),
	createEventQuery: (body) => ({
		createEventQueryResponse: {
			url: config.backendRESTRoute + `/eventquery/create`,
			method: 'POST',
			body: JSON.stringify(body)
		}
	}),
	editEventQuery: (body) => ({
		editEventQueryResponse: {
			url: config.backendRESTRoute + `/eventquery/${props.match.params.eventQueryId}/edit`,
			method: 'PUT',
			body: JSON.stringify(body)
		}
	})
}))(CreateEventQueryView);
