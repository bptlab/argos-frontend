import React, { Component } from 'react';
import './Filterbar.css';
import Filter from './Filter/Filter.js'

class Filterbar extends Component {
    constructor(props) {
        super(props);
        this.appendFilter = this.appendFilter.bind(this);
    }

    appendFilter() {
        this.props.add();
    }

    render() {
        return (
            <div>
                <div className="form-group row">
                    {this.props.filter.map((filter, index) => <Filter key={filter.id} id={index} value={filter.value} changeFilterValue={this.props.changeFilterValue}/>)}
                </div>
                <button onClick={ () => this.appendFilter() }>
                    <i className="fa fa-plus" aria-hidden="true"/>
                </button>
            </div>
        );
    }
}

export default Filterbar;
