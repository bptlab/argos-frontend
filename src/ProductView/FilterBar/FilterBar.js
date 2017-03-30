import React, { Component } from 'react';
import RemovableInputField from '../../Utils/RemovableInputField.js';


class FilterBar extends Component {
    decideOnRemoveButton(currentFilter) {
        // TODO Think that over..
        if(this.props.filter[0] === currentFilter || this.props.filter[this.props.filter.length - 1] === currentFilter) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <div className="filter-bar container">
                <div className="form-group row">
                    {this.props.filter.map((filter) =>
                        <RemovableInputField key={filter.id} id={filter.id} value={filter.value} placeholder="Search..."
                                             onInputChange={this.props.onInputChange} showRemove={this.decideOnRemoveButton(filter)}/>
                    )}
                </div>
            </div>
        );
    }
}

export default FilterBar;
