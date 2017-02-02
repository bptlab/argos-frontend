import React, {Component} from 'react';
import Header from './Header/Header.js';
import Diagram from './Diagram/Diagram.js';
import SearchBar from './SearchBar/SearchBar.js';
import ProductCardGrid from './ProductCardGrid/ProductCardGrid.js';
import './DashboardView.css'

class DashboardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
        // function binding
        this.handleSearchInput = this.handleSearchInput.bind(this)
    }

    handleSearchInput(searchText) {
        this.setState({searchText: searchText});
    }
    
    render() {
        return (
            <div className="DashboardView">
                <Header/>
                <Diagram products={this.props.products}/>
                <SearchBar
                    onChangeSearchInput={this.handleSearchInput}
                    searchText={this.state.searchText}/>
                <ProductCardGrid
                    products={this.props.products}
                    searchText={this.state.searchText}/>
            </div>
        );
    } 
} 
export default DashboardView;