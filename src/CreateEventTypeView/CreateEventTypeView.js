import React from "react";
import ConnectionComponent from "./../Utils/ConnectionComponent.js";
import TextField from "material-ui/TextField";
import {Container} from "react-grid-system";
import RaisedButton from "material-ui/RaisedButton";
import IconSave from "material-ui/svg-icons/content/save";
import IconCancel from "material-ui/svg-icons/navigation/cancel";
import Header from "./../Header";
import {css} from "aphrodite";
import AppStyles from "./../AppStyles";
import config from '../config/config.js';
import help from "../config/help";
import Notification from '../Utils/Notification';
import {Paper} from "material-ui";
import Utils from '../Utils/Utils.js';

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
		this.latestNotificationShown = false;
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
		window.location =  Utils.getParentPageURL(window.location.href, 2);
	}

	handleChangeEventTypeTimestampAttribute(event) {
		this.setState({
			eventTypeTimestampAttribute: event.target.value,
			eventTypeTimestampAttributeErrorText: ''
		});
	}

	submitForm() {
		const errorState = {};
		if (!this.state.eventTypeName) {
			errorState['eventTypeNameErrorText'] = help.messages.requiredFieldMessage;
		}
		if (this.state.eventTypeName.indexOf(' ') >= 0) {
			errorState['eventTypeNameErrorText'] = help.messages.noSpaceInInput;
		}
		if (!this.state.eventTypeTimestampAttribute) {
			errorState['eventTypeTimestampAttributeErrorText'] = help.messages.requiredFieldMessage;
		}
		if (Object.keys(errorState).length > 0) {
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
			Notification.addSnackbarNotificationOnReferrer(help.messages.createdEventTypeMessage,
				Notification.ModeEnum.SUCCESS);
		}
		this.latestNotificationShown = false;
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
		if (optionalActions && optionalActions.fulfilled) {
			window.location = Utils.getParentPageURL(window.location.href, 2);
			return null;
		}
		if (optionalActions && optionalActions.rejected && !this.latestNotificationShown) {
			Notification.addSnackbarNotificationOnSelf(optionalActions.reason,
				Notification.ModeEnum.ERROR);
			this.latestNotificationShown = true;
		}
		return (
			<div>
				<Header title={help.descriptions.createEventTypeView} />
				<Container className={css(AppStyles.containerMarginTop)}>
					<Paper className={css(AppStyles.paperPadding)} zDepth={2}>
						<form>
							<div className={css(AppStyles.elementMarginTop)}>
								<TextField
									data-hint={help.input.eventTypeView.name}
									data-hintPosition="middle-right"
									floatingLabelText={help.descriptions.eventTypeName}
									fullWidth={true}
									floatingLabelStyle={{color: config.colors.text}}
									value={this.state.eventTypeName}
									onChange={this.handleChangeEventTypeName}
									required={true}
									errorText={this.state.eventTypeNameErrorText}/>
								<TextField
									data-hint={help.input.eventTypeView.timestamp}
									data-hintPosition="middle-right"
									floatingLabelText={help.descriptions.timestampName}
									floatingLabelStyle={{color: config.colors.text}}
									fullWidth={true}
									value={this.state.eventTypeTimestampAttribute}
									onChange={this.handleChangeEventTypeTimestampAttribute}
									errorText={this.state.eventTypeTimestampAttributeErrorText}/>
								<h3 className={css(AppStyles.subHeadline)}>{help.descriptions.attributes}:</h3>
								{this.state.attributes.map((attribute) =>
									<TextField
										key={attribute.id}
										data-hint={help.input.eventTypeView.attributes}
										data-hintPosition="middle-right"
										id={attribute.id}
										value={attribute.value}
										floatingLabelStyle={{color: config.colors.text}}
										floatingLabelText={help.descriptions.attributeName}
										onChange={this.onInputChange.bind(this)}
										fullWidth={true}/>
								)}
							</div>
						</form>
						<div className={css(AppStyles.textAlignCenter)}>
							<RaisedButton
								label={help.descriptions.abort}
								icon={<IconCancel/>}
								className={css(AppStyles.marginAllSites)}
								onClick={this.abort}
								secondary={true}/>
							<RaisedButton
								label={help.descriptions.save}
								icon={<IconSave/>}
								onClick={this.submitForm}
								className={css(AppStyles.marginAllSites)}
								primary={true}/>
						</div>
					</Paper>
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
