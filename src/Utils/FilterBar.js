import React, {Component} from "react";
import config from "./../config/config";
import {css} from "aphrodite";
import SearchBar from "./SearchBar";
import {Row, Col} from "react-grid-system";

/**
 * @fileOverview
 * Usage:
 *     <FilterBar
 *         _Required_
 *             onFiltersChange      {callback}  -> Called if any filter in bar changed
 *         _Optional_
 *             autoCompleteSource   {array}     -> Passed down, please refer {@link SearchBar}
 *             useColumns           {bool}      -> Passed down, please refer {@link SearchBar}
 *             styles
 *     />
 */
class FilterBar extends Component {
	constructor () {
		super();
		this.styles = {
			primaryBorderColor: {
				borderColor: config.colors.primary,
			}
		};

		this.state = {
			filter: [{id: '0', value: '', column: null}],
			lastFilterId: 0,
		};

		this.onFilterChange = this.onFilterChange.bind(this);
	}

	onFilterChange(filter) {
		let updatedFilters = this.state.filter;
		const currentFilterIndex = this.getPositionOfFilterInState(filter);

		updatedFilters[currentFilterIndex] = filter;

		if (!filter.value && !filter.column) {
			updatedFilters.splice(currentFilterIndex, 1);
		}

		updatedFilters = this.assureThatEmptyFilterExists(updatedFilters);

		this.setState({
				filter: updatedFilters
			},
			() => this.props.onFiltersChange(this.state.filter)
		);
	}

	getPositionOfFilterInState(filter) {
		const filterIds = this.state.filter.map(oldFilter => {
			return oldFilter.id;
		});
		return filterIds.indexOf(filter.id);
	}

	assureThatEmptyFilterExists(filters) {
		const emptyFilterExists = filters.some(filter => {
			return !filter.value && !filter.column;
		});

		if(!emptyFilterExists) {
			const newFilterId = this.state.lastFilterId + 1;
			const newFilter = {id: `${newFilterId}`, value: '', column: null};
			filters = filters.concat([newFilter]);
			this.setState({
				lastFilterId: newFilterId,
			});
		}

		return filters;
	}

	render() {
		return (
			<Row className={css(this.props.styles)}>
				{this.state.filter.map(filter => {
					return(
						<Col sm={4} key={filter.id}>
							<SearchBar
								id={filter.id}
								value={filter.value}
								column={filter.column}
								autoCompleteSource={this.props.autoCompleteSource}
								onInputChange={this.onFilterChange}
							    useColumns={this.props.useColumns}
							/>
						</Col>
					);
				})}
			</Row>
		);
	}
}

export default FilterBar;
