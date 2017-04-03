import React, { Component } from 'react';
import RemovableInputField from '../../Utils/RemovableInputField.js';


class FilterBar extends Component {
    decideOnRemoveButton(currentFilter) {
        return !(this.props.filter[this.props.filter.length - 1] === currentFilter);
    }

    render() {
        return (
            <div className="filter-bar">
                <div className="form-group row">
                    {this.props.filter.map((filter) =>
                        <RemovableInputField key={filter.id}
                                             id={filter.id}
                                             value={filter.value}
                                             placeholder="Search..."
                                             onInputChange={this.props.onInputChange}
                                             displayRemoveButton={this.decideOnRemoveButton(filter)}/>
                    )}
                </div>
            </div>
        );
    }
}

export default FilterBar;
