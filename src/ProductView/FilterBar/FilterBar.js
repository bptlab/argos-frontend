import React, { Component } from 'react';
import Filter from './Filter/Filter.js';

class FilterBar extends Component {
    render() {
        return (
            <div className="filter-bar container">
                <div className="form-group row">
                    {this.props.filter.map((filter, index) =>
                        <Filter key={filter.id} id={index} value={filter.value}
                                onChangeFilterInput={this.props.onChangeFilterInput}/>
                    )}
                </div>
            </div>
        );
    }
}

export default FilterBar;
