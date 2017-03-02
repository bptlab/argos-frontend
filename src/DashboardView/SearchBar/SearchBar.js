import React, { Component } from 'react';
import {argosConfig} from '../../config/argosConfig';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleChangeSearchInput = this.handleChangeSearchInput.bind(this);
    }

    handleChangeSearchInput(event) {
        this.props.onChangeSearchInput(event.target.value);
    }

    render() {
        return (
            <div className="container">
                <div className="searchArea">
                    <div className="input-group">
                        <span className="input-group-addon" id="search-addon">
                            <i className="fa fa-search"/>
                        </span>
                        <input
                            type="text"
                            ref="searchInput"
                            className="form-control"
                            placeholder={argosConfig.searchPlaceholder}
                            value={this.props.searchText}
                            onChange={this.handleChangeSearchInput}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default SearchBar;
