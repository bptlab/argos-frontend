import React, {Component} from 'react';
import Diagram from './Diagram/Diagram.js';
import SearchBar from './SearchBar/SearchBar.js';
import ProductCardGrid from './ProductCardGrid/ProductCardGrid.js';

class DashboardView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
        this.handleUserInput = this.handleUserInput.bind(this)
    }

    handleUserInput(searchText) {
        this.setState({searchText: searchText});
    }

    componentDidMount() {
    }
    
    render() {
        return (
            <div className="AppWrapper">
                <Diagram products={this.props.products}/>
                <SearchBar searchText={this.state.searchText} onUserSearchInput={this.handleUserInput}/>
                <ProductCardGrid searchText={this.state.searchText} products={this.props.products}/>
            </div>);
    } 
} 
export default DashboardView;