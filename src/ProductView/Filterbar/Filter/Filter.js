import React, { Component } from 'react';
import './Filter.css';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.changeFilterValue = this.changeFilterValue.bind(this);
    }

    changeFilterValue(event) {
        this.props.changeFilterValue(this.props.id, event.target.value);
    }

    render() {
        return (
            <div className="input-group">
                <span className="input-group-addon" id="search-addon">
                    <i className="fa fa-search" aria-hidden="true"/>
                </span>
                <input type="text" className="form-control" placeholder="Search..." aria-describedby="search-addon" value={this.props.filterText} onChange={this.changeFilterValue}/>
                {this.props.id}
            </div>
        );
    }
}

export default Filter;