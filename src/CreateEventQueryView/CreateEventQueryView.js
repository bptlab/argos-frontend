import React from "react";
import {PromiseState} from "react-refetch";
import ConnectionComponent from "./../Utils/ConnectionComponent.js";
import {Col, Container, Row} from "react-grid-system";
import {RaisedButton} from "material-ui";
import IconSave from "material-ui/svg-icons/content/save";
import IconCancel from "material-ui/svg-icons/navigation/cancel";
import Header from "./../Header";
import {css} from "aphrodite";
import EventTypeInformation from "./EventTypeInformation";
import EventQueryInputArea from "./EventQueryInputArea";
import config from "../config/config";
import AppStyles from "../AppStyles";
import Utils from "../Utils/Utils";

class CreateEventQueryView extends ConnectionComponent {

	constructor(props) {
		super(props);
		this.state = {
			query: '',
			queryErrorMessage: '',
			queryDescription: '',
			descriptionErrorMessage: ''
		};
		this.isCreateView = this.props.match.params.isNewQuery === "true";
		this.handleCreateQueryInput = this.handleCreateQueryInput.bind(this);
		this.handleEditQueryInput = this.handleEditQueryInput.bind(this);
		this.isInvalidInput = this.isInvalidInput.bind(this);
		this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
		this.submitNewQuery = this.submitNewQuery.bind(this);
		this.submitUpdatedQuery = this.submitUpdatedQuery.bind(this);
	}
	
	handleCreateQueryInput(event) {
		this.setState({
			query: event.target.value,
			queryErrorMessage: ''
		});
	}

	handleEditQueryInput(event) {
		const oldQuery = this.state.query;
		const viewQuery = Utils.splitStringBeforeSubString(oldQuery, "FROM ");
		this.setState({
			query: viewQuery + "FROM " + event.target.value,
			queryErrorMessage: ''
		});
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
				descriptionErrorMessage: config.messages.requiredFieldMessage
			});
			validationErrorOccured = true;
		}
		if(!this.state.query) {
			this.setState({
				queryErrorMessage: config.messages.requiredFieldMessage
			});
			validationErrorOccured = true;
		}
		return validationErrorOccured;
	}

	submitNewQuery() {
        if (!this.isInvalidInput()) {
            this.props.createEventQuery({
                EventTypeId: this.props.match.params.eventTypeId,
                Description: this.state.queryDescription,
                Query: this.state.query
            });
        }
	}

	submitUpdatedQuery() {
		if (!this.isInvalidInput()) {
			this.props.editEventQuery({
				Description: this.state.queryDescription,
				Query: this.state.query
			});
		}
	}
	
	abort() {
		window.history.back();
	}

	renderCreateEventQuery() {
        const allFetches = PromiseState.all([this.props.eventType, this.props.attributes]);
        const optionalActions = this.props.createEventQueryResponse;
        if(optionalActions && optionalActions.fulfilled) {
            window.history.back();
            return null;
        }
        const eventType = this.props.eventType.value;
        const attributes = this.props.attributes.value;
        const connectionIncomplete = super.render(allFetches);
        if (connectionIncomplete) {
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
								<EventQueryInputArea
									handleQueryInputChange={this.handleEditQueryInput}
									queryErrorMessage={this.state.queryErrorMessage}
									handleDescriptionInputChange={this.handleDescriptionInput}
									descriptionErrorMessage={this.state.descriptionErrorMessage}
								/>
							</Col>
						</Row>
						<div className={css(AppStyles.textAlignCenter)}>
							<RaisedButton
								label="Abort"
								icon={<IconCancel/>}
								className={css(AppStyles.marginAllSites)}
								secondary={true}
								onClick={this.abort}
							/>
							<RaisedButton
								label="Save"
								icon={<IconSave/>}
								className={css(AppStyles.marginAllSites)}
								primary={true}
								onClick={this.submitNewQuery}
							/>
						</div>
					</Container>
				</div>
			</div>
		);
	}

    eventQueryPending() {
        if (!this.props.eventQuery) {
            return <div />;
        }
        const eventQueryConnection = super.render(this.props.eventQuery);
        if (eventQueryConnection) {
            return eventQueryConnection;
        }
        if (!this.props.eventQuery.value) {
            return <div />;
        }
        return null;
    }

	renderEditEventQuery() {
        const allFetches = PromiseState.all([this.props.eventType, this.props.attributes]);
        const optionalActions = this.props.editEventQueryResponse;
        if(optionalActions && optionalActions.fulfilled) {
            window.history.back();
            return null;
        }
        const eventQueryPending = this.eventQueryPending();
        if (eventQueryPending) {
            return eventQueryPending;
        }
        const eventType = this.props.eventType.value;
        const attributes = this.props.attributes.value;
        const connectionIncomplete = super.render(allFetches);
        if (connectionIncomplete) {
            return connectionIncomplete;
        }
		return (
			<div>
				<Header title={"Edit Event Query for " + eventType.Name}/>
				<div className={AppStyles.elementMarginTop}>
					<Container>
						<Row>
							<Col md={4}>
								<EventTypeInformation attributes={attributes}/>
							</Col>
							<Col md={8}>
								<EventQueryInputArea
									handleQueryInputChange={this.handleCreateQueryInput}
									queryErrorMessage={this.state.queryErrorMessage}
									handleDescriptionInputChange={this.handleDescriptionInput}
									descriptionErrorMessage={this.state.descriptionErrorMessage}
									eventQuery={this.props.eventQuery.value}
								/>
							</Col>
						</Row>
						<div className={css(AppStyles.textAlignCenter)}>
							<RaisedButton
								label="Abort"
								icon={<IconCancel/>}
								className={css(AppStyles.marginAllSites)}
								secondary={true}
								onClick={this.abort}
							/>
							<RaisedButton
								label="Save"
								icon={<IconSave/>}
								className={css(AppStyles.marginAllSites)}
								primary={true}
								onClick={this.submitUpdatedQuery}
							/>
						</div>
					</Container>
				</div>
			</div>
		);
	}

	componentWillMount() {
		if (!this.isCreateView) {
			this.props.lazyLoadEventQuery();
		}
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
