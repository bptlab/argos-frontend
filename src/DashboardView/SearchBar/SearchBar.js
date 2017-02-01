import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onUserSearchInput(event.target.value);
    }

    render() {
        return (
            <div className="container">
                <div className="searchArea">
                    <div className="input-group">
                    <span className="input-group-addon" id="search-addon">
                        <i className="fa fa-search" aria-hidden="true"/>
                    </span>
                        <input type="text" className="form-control" placeholder="Search..." aria-describedby="search-addon" value={this.props.searchText} onChange={this.handleChange}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;
