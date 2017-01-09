import React, { Component } from 'react';
import './SearchBar.css';
import {FormGroup, Input} from 'reactstrap';

class SearchBar extends Component {
    render() {
        return (
            <div className="searchArea">
                <FormGroup>
                    <Input />
                </FormGroup>
            </div>
        );
    }
}

export default SearchBar;
