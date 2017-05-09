import React, {Component} from "react";
import AutoComplete from "material-ui/AutoComplete";
import IconButton from "material-ui/IconButton";
import ActionDelete from "material-ui/svg-icons/action/delete";
import config from "./../config/config";
import {css} from "aphrodite";
import AppStyles from "./../AppStyles";

/**
 * Usage:
 *     <SearchBar
 *         _Required_
 *             id -> int to identify filter in callback
 *             autoCompleteSource -> Array containing strings for autoComplete
 *             onInputChange -> Callback when filter changes, needs to understand an object as specified in {@link #getFilterObject}
 *         _Optional_
 *             value -> initial search value, defaults to ""
 *             column -> initial filter column, defaults to null
 *             styles
 *     />
 */
class SearchBar extends Component {
	constructor (props) {
		super(props);

		this.styles = {
			primaryBorderColor: {
				borderColor: config.colors.primaryColor,
			}
		};

		this.autoCompleteSource = props.autoCompleteSource;
		if (!this.autoCompleteSource) {
			this.autoCompleteSource = [];
		}
		let initialFilterColumn = null;
		if (props.column) {
			initialFilterColumn = props.column;
		}

		let initialFilterValue = "";
		if (props.value) {
			initialFilterValue = props.value;
		}

		this.state = {
			filterColumn: initialFilterColumn,
			filterValue: initialFilterValue,
			dataSource: this.autoCompleteSource,
		};

		this.handleUpdateInput = this.handleUpdateInput.bind(this);
		this.handleNewRequest = this.handleNewRequest.bind(this);
		this.resetFilter = this.resetFilter.bind(this);
	}

	handleUpdateInput(searchText) {
		this.splitSearchText(searchText);
	}

	getFilterObject() {
		return {
			id: this.props.id,
			value: this.state.filterValue,
			column: this.state.filterColumn
		};
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
			},
			() => this.props.onInputChange(this.getFilterObject())
		);
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
		this.setState(
			{
				filterColumn: column,
				filterValue: value,
			},
			() => this.props.onInputChange(this.getFilterObject())
		);
	}

	/**
	 * En- or disables the autoComplete function of the input field.
	 *
	 * @param enabled {bool} indicating whether autoComplete should be turned off or on
	 */
	useAutoComplete(enabled = true) {
		if (enabled) {
			return this.setState({
				dataSource: this.autoCompleteSource,
			});
		}
		return this.setState({
			dataSource: [],
		});
	}

	/**
	 * Resets column and value of search field.
	 */
	resetFilter() {
		this.setState(
			{
				filterColumn: null,
				filterValue: "",
			},
			() => this.props.onInputChange(this.getFilterObject())
		);
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
		if (this.autoCompleteSource.length > 0) {
			return "ColumnName: Search value";
		}
		return "Search";
	}

	render() {
		return (
			<div className={css(this.props.styles, AppStyles.w100)}>
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
