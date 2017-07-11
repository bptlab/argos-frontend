import React, {Component} from "react";
import AutoComplete from "material-ui/AutoComplete";
import IconButton from "material-ui/IconButton";
import ActionDelete from "material-ui/svg-icons/action/delete";
import config from "./../config/config";
import help from "./../config/help";
import {css} from "aphrodite";
import AppStyles from "./../AppStyles";

/**
 * @fileOverview
 * Usage:
 *     <SearchBar
 *         _Required_
 *             id                   {integer}       -> Identifies filter in callback
 *             onInputChange        {callback}      -> Called when filter changes, needs to understand an object as specified in {@link #getFilterObject}
 *         _Optional_
 *             value                {string}=""     -> Initial search value
 *             column               {string}=null   -> initial filter column, defaults to null
 *             autoCompleteSource   {array}=[]      -> contains strings for autoComplete, defaults to []
 *             useColumns           {bool}=true     -> defines, if ':' logic is used, this will also disable autoComplete
 *             styles
 *     />
 */
class SearchBar extends Component {
	constructor (props) {
		super(props);

		this.styles = {
			primaryBorderColor: {
				borderColor: config.colors.primary,
			}
		};

		let initialFilterColumn = null;
		if (props.column) {
			initialFilterColumn = props.column;
		}

		let initialFilterValue = "";
		if (props.value) {
			initialFilterValue = props.value;
		}

		this.useColumnLogic = this.props.useColumns;
		if (this.useColumnLogic === undefined) {
			this.useColumnLogic = true;
		}

		this.autoCompleteSource = props.autoCompleteSource;
		if (!this.autoCompleteSource || !this.useColumnLogic) {
			this.autoCompleteSource = [];
		}

		this.state = {
			filterColumn: initialFilterColumn,
			filterValue: initialFilterValue,
			dataSource: this.autoCompleteSource,
		};

		this.handleUpdateInput = this.handleUpdateInput.bind(this);
		this.handleNewRequest = this.handleNewRequest.bind(this);
		this.resetFilter = this.resetFilter.bind(this);
		this.itemToFocus = false;
	}

	handleUpdateInput(searchText) {
		window.componentToFocus = this;
		if (this.useColumnLogic) {
			this.splitSearchText(searchText);
		}
		else {
			this.setState({filterValue: searchText},
				() => this.props.onInputChange(this.getFilterObject())
			);
		}
	}
	
	componentDidUpdate() {
		if(window.componentToFocus === this) {
			this.parentWrapper.querySelector('.auto-focus-component').click();
			this.parentWrapper.querySelector('.auto-focus-component input').focus();
		}
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
			return config.descriptions.searchFor + ": " + this.state.filterColumn;
		}
		return config.descriptions.search;
	}

	/**
	 * Creates the label to be shown in the input field when no user input was provided so far.
	 *
	 * @returns {string} for hintText
	 */
	getHintText() {
		if (this.state.filterColumn) {
			return config.descriptions.searchValue;
		}
		if (this.autoCompleteSource.length > 0) {
			return config.descriptions.columnNameSearchValue;
		}
		return config.descriptions.search;
	}

	getDeleteButton() {
		const buttonIsDisabled = this.state.filterValue === "" && this.state.filterColumn === null;
		return (<IconButton
			className={css(AppStyles.pAbsolute, AppStyles.r0)}
			onTouchTap={this.resetFilter}
			tooltip={help.button.deleteFilter}
			tooltipPosition="bottom-left"
			disabled={buttonIsDisabled}>
			<ActionDelete/>
		</IconButton>);
	}

	render() {
		return (
			<div className={css(this.props.styles, AppStyles.dFlex, AppStyles.alignItemsFlexEnd, AppStyles.w100, AppStyles.pRelative)}
				ref={(input) => {this.parentWrapper = input;}}>
				<AutoComplete
					hintText={this.getHintText()}
					floatingLabelText={this.getFloatingLabelText()}
					searchText={this.state.filterValue}
					onUpdateInput={this.handleUpdateInput}
					onNewRequest={this.handleNewRequest}
					dataSource={this.state.dataSource}
					filter={AutoComplete.caseInsensitiveFilter}
					openOnFocus={true}
					fullWidth={true}
					className="auto-focus-component"
				/>
				{this.getDeleteButton()}

			</div>
		);
	}
}

export default SearchBar;
