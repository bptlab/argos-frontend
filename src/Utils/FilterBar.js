import React, {Component} from "react";
import config from "./../config/config";
import {css} from "aphrodite";
import SearchBar from "./SearchBar";
import {Row, Col} from "react-grid-system";

class FilterBar extends Component {
	constructor () {
		super();
		this.styles = {
			primaryBorderColor: {
				borderColor: config.colors.primaryColor,
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
		const filterIds = this.state.filter.map(oldFilter => {
			return oldFilter.id;
		});
		const currentFilterIndex = filterIds.indexOf(filter.id);

		updatedFilters[currentFilterIndex] = filter;

		if (!filter.value && !filter.column) {
			updatedFilters.splice(currentFilterIndex, 1);
		}

		const emptyFilterExists = updatedFilters.some(filter => {
			return !filter.value && !filter.column;
		});

		if(!emptyFilterExists) {
			const newFilterId = this.state.lastFilterId + 1;
			const newFilter = {id: `${newFilterId}`, value: '', column: null};
			updatedFilters = updatedFilters.concat([newFilter]);
			this.setState({
				lastFilterId: newFilterId,
			});
		}

		this.setState({
				filter: updatedFilters
			},
			() => this.props.onFiltersChange(this.state.filter)
		);
	}

	render() {
		return (
			<div className={css(this.props.styles)}>
				<Row>
					{this.state.filter.map(filter => {
						return(
							<Col sm={4} key={filter.id}>
								<SearchBar
									id={filter.id}
									value={filter.value}
									column={filter.column}
									autoCompleteSource={this.props.autoCompleteSource}
									onInputChange={this.onFilterChange}
								/>
							</Col>
						);
					})}
				</Row>
			</div>
		);
	}
}

export default FilterBar;
