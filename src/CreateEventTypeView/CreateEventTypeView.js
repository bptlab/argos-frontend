import React from "react";
import ConnectionComponent from "./../Utils/ConnectionComponent.js";
import TextField from "material-ui/TextField";
import {Col, Container, Row} from "react-grid-system";
import RaisedButton from "material-ui/RaisedButton";
import IconSave from "material-ui/svg-icons/content/save";
import IconCancel from "material-ui/svg-icons/navigation/cancel";
import Header from "./../Header";
import {css} from "aphrodite";
import AppStyles from "./../AppStyles";
import config from '../config/config.js';
import help from "../config/help";
import Notification from '../Utils/Notification';


class CreateEventTypeView extends ConnectionComponent {
	constructor(props) {
		super(props);
		this.state = {
			attributes: [{id: '0', value: ''}],
			lastAttributeId: 0,
			eventTypeName: '',
			eventTypeNameErrorText: '',
			eventTypeTimestampAttribute: '',
			eventTypeTimestampAttributeErrorText: ''
		};
		this.nextAttributeId = 1;
		this.handleChangeEventTypeName = this.handleChangeEventTypeName.bind(this);
		this.handleChangeEventTypeTimestampAttribute = this.handleChangeEventTypeTimestampAttribute.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}

	handleChangeEventTypeName(event) {
		this.setState({
			eventTypeName: event.target.value,
			eventTypeNameErrorText: '',
		});
	}
	
	abort() {
		window.history.back();
	}

	handleChangeEventTypeTimestampAttribute(event) {
		this.setState({
			eventTypeTimestampAttribute: event.target.value,
			eventTypeTimestampAttributeErrorText: ''
		});
	}

	submitForm() {
		const errorState = {};
		if(!this.state.eventTypeName) {
			errorState['eventTypeNameErrorText'] = config.messages.requiredFieldMessage;
		}
		if(!this.state.eventTypeTimestampAttribute) {
			errorState['eventTypeTimestampAttributeErrorText'] = config.messages.requiredFieldMessage;
		}
		if(Object.keys(errorState).length > 0) {
			this.setState(errorState);
		} else {
			const attributes = this.state.attributes;
			attributes.pop(); //remove last empty attribute
			const body = {
				Name: this.state.eventTypeName,
				TimestampAttributeName: this.state.eventTypeTimestampAttribute,
				TypeAttributes: attributes.map((attribute) => {
					return {
						Name: attribute.value
					};
				})
			};
			this.props.createEventType(body);
			super.addSnackbarNotification(config.messages.createdEventTypeMessage, Notification.ModeEnum.SUCCESS);
		}
	}

	onInputChange(event) {
		const currentAttributeId = event.target.id.toString();
		const updatedAttributes = this.state.attributes;
		const attributeIds = updatedAttributes.map(attribute => {
			return attribute.id;
		});
		const currentAttributeIndex = attributeIds.indexOf(currentAttributeId);

		if (!event.target.value) {
			updatedAttributes.splice(currentAttributeIndex, 1);
			this.setState({attributes: updatedAttributes});
			return;
		}

		updatedAttributes[currentAttributeIndex].value = event.target.value;

		if (parseInt(currentAttributeId, 10) === this.state.lastAttributeId) {
			const newAttributeId = this.nextAttributeId;
			this.nextAttributeId += 1;
			const newAttribute = {id: `${newAttributeId}`, value: ''};
			this.setState({
				attributes: updatedAttributes.concat([newAttribute]),
				lastAttributeId: newAttributeId
			});
		}
		else {
			this.setState({attributes: updatedAttributes});
		}
	}

	render() {
		const optionalActions = this.props.createEventTypeResponse;
		if(optionalActions && optionalActions.fulfilled) {
			window.history.back();
			return null;
		}
		return (
			<div>
				<Header title="Create New Event Type"/>
				<Container>
					{optionalActions && optionalActions.rejected &&
						<Notification
							open={true}
							message={optionalActions.reason}
							mode={Notification.ModeEnum.ERROR}/>
					}
					<form>
						<div className={css(AppStyles.dFlex, AppStyles.elementMarginTop)}>
							<Col>
								<Row>
									<Col>
										<TextField
											data-hint={help.input.eventTypeView.name}
											data-hintPosition="middle-right"
											floatingLabelText="Event Type Name"
											fullWidth={true}
											value={this.state.eventTypeName}
											onChange={this.handleChangeEventTypeName}
											required={true}
											errorText={this.state.eventTypeNameErrorText}/>
									</Col>
								</Row>
								<Row>
									<Col>
										<TextField
											data-hint={help.input.eventTypeView.timestamp}
											data-hintPosition="middle-right"
											floatingLabelText="Timestamp Attribute"
											fullWidth={true}
											value={this.state.eventTypeTimestampAttribute}
											onChange={this.handleChangeEventTypeTimestampAttribute}
											errorText={this.state.eventTypeTimestampAttributeErrorText}/>
									</Col>
								</Row>
								<Row className={css(AppStyles.elementMarginTop)}>
									<Col md={4}> Attributes: </Col>
								</Row>
								<Row
									data-hint={help.input.eventTypeView.attributes}
									data-hintPosition="top-middle">
									<Col>
										{this.state.attributes.map((attribute) =>
											<TextField
												key={attribute.id}
												id={attribute.id}
												value={attribute.value}
												hintText="Attribute Name"
												onChange={this.onInputChange.bind(this)}
												fullWidth={true}/>
										)}
									</Col>
								</Row>
							</Col>
						</div>
					</form>
					<div className={css(AppStyles.textAlignCenter)}>
						<RaisedButton
							label="Abort"
							icon={<IconCancel/>}
							className={css(AppStyles.marginAllSites)}
							onClick={this.abort}
							secondary={true}/>
						<RaisedButton
							label="Save"
							icon={<IconSave/>}
							onClick={this.submitForm}
							className={css(AppStyles.marginAllSites)}
							primary={true}/>
					</div>
				</Container>
			</div>
		);
	}
}

export default ConnectionComponent.argosConnector()(() => ({
	createEventType: body => ({
		createEventTypeResponse: {
			url: config.backendRESTRoute + `/eventtype/create`,
			method: 'POST',
			body: JSON.stringify(body)
		}
	})
}))(CreateEventTypeView);
