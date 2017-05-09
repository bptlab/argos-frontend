import React, {Component} from "react";
import AutoComplete from "material-ui/AutoComplete";
import IconButton from "material-ui/IconButton";
import ActionDelete from "material-ui/svg-icons/action/delete";
import config from "./../config/config";
import {css} from "aphrodite";

class SearchBar extends Component {
	constructor (props) {
		super(props);
		this.styles = {
			primaryBorderColor: {
				borderColor: config.colors.primaryColor,
			}
		};
		this.state = {
			filterColumn: null,
			filterValue: '',
			dataSource: props.dataSource,
		};
		this.handleUpdateInput = this.handleUpdateInput.bind(this);
		this.handleNewRequest = this.handleNewRequest.bind(this);
		this.resetFilter = this.resetFilter.bind(this);
	}

	handleUpdateInput(searchText) {
		this.splitSearchText(searchText);
	}

	/**
	 * Handler for selecting an autoComplete entry or pressing enter in the input field.
	 * If an autoComplete entry is selected, the selected value is used as column filter
	 * and the input field gets cleared for the value input.
	 *
	 * @param chosenRequest {string} contains the selected value
	 * @param index {number} index of selected autoComplete entry
	 */
	handleNewRequest(chosenRequest, index) {
		if (index === -1) {     //index -1 means: Enter was pressed in textfield -> not relevant here
			return;
		}
		this.useAutoComplete(false);
		this.setState({
			filterColumn: chosenRequest,
			filterValue: '',
		});
	}

	/**
	 * Tries to split the user input into columnname to be searched in and the search value.
	 * If a column is defined, the autoComplete function is disabled.
	 *
	 * @param searchText {string} user input
	 */
	splitSearchText(searchText) {
		let column = this.state.filterColumn;
		let value = searchText;
		if (!column) {
			const separatorPosition = searchText.indexOf(":");
			if(separatorPosition > 0) {
				column = searchText.substr(0, separatorPosition);
				value = searchText.substr(separatorPosition+1);
				this.useAutoComplete(false);
			}
		}
		else {
			if (!searchText.trim()) {
				value = column + ":";
				column = null;
				this.useAutoComplete();
			}
		}
		this.setState({
			filterColumn: column,
			filterValue: value,
		});
	}

	/**
	 * En- or disables the autoComplete function of the input field.
	 *
	 * @param enabled {bool} indicating whether autoComplete should be turned off or on
	 */
	useAutoComplete(enabled = true) {
		if (enabled) {
			return this.setState({
				dataSource: this.props.dataSource,
			});
		}
		return this.setState({
			dataSource: [],
		});
	}

	resetFilter() {
		this.setState({
			filterColumn: null,
			filterValue: "",
		});
	}

	/**
	 * Creates the label to be shown above the input field.
	 *
	 * @returns {string} for floatingLabelText
	 */
	getFloatingLabelText() {
		if (this.state.filterColumn) {
			return "Search for " + this.state.filterColumn;
		}
		return "Search";
	}

	/**
	 * Creates the label to be shown in the input field when no user input was provided so far.
	 *
	 * @returns {string} for hintText
	 */
	getHintText() {
		if (this.state.filterColumn) {
			return "Search value";
		}
		return "ColumnName: Search value";
	}

	render() {
		return (
			<div className={css(this.props.styles)}>
				<AutoComplete
					hintText={this.getHintText()}
					floatingLabelText={this.getFloatingLabelText()}
					searchText={this.state.filterValue}
					onUpdateInput={this.handleUpdateInput}
					onNewRequest={this.handleNewRequest}
					dataSource={this.state.dataSource}
					filter={AutoComplete.caseInsensitiveFilter}
					openOnFocus={true}
				/>
				<IconButton
					onTouchTap={this.resetFilter}
					tooltip="delete filter"
					tooltipPosition="bottom-right">
					<ActionDelete/>
				</IconButton>
			</div>
		);
	}
}

export default SearchBar;
