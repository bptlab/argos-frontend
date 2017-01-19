import React, { Component } from 'react';
import './SearchBar.css';
import {FormGroup, Input} from 'reactstrap';

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
            <div className="searchArea">
                <FormGroup>
                    <Input placeholder="Search ..."
                           value={this.props.searchText}
                           onChange={this.handleChange}/>
                </FormGroup>
            </div>
        );
    }
}

export default SearchBar;
