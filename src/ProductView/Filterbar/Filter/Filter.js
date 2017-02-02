import React, { Component } from 'react';
import './Filter.css';

class Filter extends Component {
    constructor(props) {
        super(props);
        //Function binding
        this.handleFilterInput = this.handleFilterInput.bind(this);
    }

    handleFilterInput(event) {
        this.props.onChangeFilterInput(this.props.id, event.target.value);
    }

    render() {
        return (
            <div className="filter input-group col-xs-12 col-sm-3">
                <span className="input-group-addon" id="search-addon">
                    <i className="fa fa-search" />
                </span>
                <input type="text" 
                       className="form-control"
                       placeholder="Search..." 
                       value={this.props.filterText} onChange={this.handleFilterInput}/>
            </div>
        );
    }
}

export default Filter;