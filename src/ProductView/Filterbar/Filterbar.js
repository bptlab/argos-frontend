import React, { Component } from 'react';
import './Filterbar.css';
import Filter from './Filter/Filter.js'

class Filterbar extends Component {
    render() {
        return (
            <div className="filterbar container">
                <div className="form-group row">
                    {this.props.filter.map((filter, index) =>
                        <Filter key={filter.id} id={index} value={filter.value}
                                changeFilterValue={this.props.changeFilterValue}/>
                    )}
                </div>
            </div>
        );
    }
}

export default Filterbar;
