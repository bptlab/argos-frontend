import React, { Component } from 'react';
import InputField from '../../Utils/InputField.js';

class FilterBar extends Component {
    render() {
        return (
            <div className="filter-bar container">
                <div className="form-group row">
                    {this.props.filter.map((filter, index) =>
                        <InputField key={filter.id} id={index} value={filter.value} placeholder="Search..."
                                    onInputChange={this.props.onInputChange}/>
                    )}
                </div>
            </div>
        );
    }
}

export default FilterBar;
