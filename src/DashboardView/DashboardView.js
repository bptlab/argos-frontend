import React, {Component} from 'react';
import Header from './Header/Header.js';
import Diagram from './Diagram/Diagram.js';
import SearchBar from './SearchBar/SearchBar.js';
import ProductCardGrid from './ProductCardGrid/ProductCardGrid.js';
import Loader from '../Loader/Loader.js';

class DashboardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            products:   null,
            error:      null
        };
        // function binding
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleProductData = this.handleProductData.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleSearchInput(searchText) {
        this.setState({searchText: searchText});
    }
    
    componentDidMount() {
        this.props.dataSource.fetchProducts(this.handleProductData, this.handleError);
    }

    handleProductData(products) {
        this.setState({
            products: products
        });
    }
    
    handleError(errorCode) {
        this.setState({
            error: errorCode
        });
    }
    
    render() {
        let component = (<Loader/> );
        if(this.state.error) {
            component = (
                <div className="critical-error">
                    <i className="fa fa-exclamation-triangle warning-sign" />
                    <p>{this.state.error}</p>
                </div>
            );
        } else if(this.state.products) {
            component = (
                <div>
                    <Header/>
                    <Diagram products={this.state.products}/>
                    <SearchBar
                        onChangeSearchInput={this.handleSearchInput}
                        searchText={this.state.searchText}/>
                    <ProductCardGrid
                        products={this.state.products}
                        searchText={this.state.searchText}/>
                </div>
            );
        }
        return(
            <div className="dashboard-view">
                {component}
            </div>
        );
    } 
} 
export default DashboardView;