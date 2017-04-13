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
            minimizedProducts:   [],
            productFamilies: null,
            error:      null,
            excludedStates: []
        };
        // function binding
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleProductFamilyData = this.handleProductFamilyData.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleExcludeStateInput = this.handleExcludeStateInput.bind(this);
    }
    
    handleExcludeStateInput(state) {
        const stateIndex = this.state.excludedStates.indexOf(state);
        if(stateIndex === -1) {
            this.setState({
                excludedStates: this.state.excludedStates.concat([state])
            });
        } else {
            const newStates = this.state.excludedStates;
            newStates.splice(stateIndex,1);
            this.setState({
                excludedStates: newStates
            });
        }
    }

    handleSearchInput(searchText) {
        this.setState({searchText: searchText});
    }
    
    componentDidMount() {
        this.fetchData();
        this.props.dataSource.notificationService.subscribe("Product", this.fetchData.bind(this));
    }

    componentWillUnmount() {
        this.props.dataSource.notificationService.unsubscribe("Product", this.fetchData.bind(this));
    }
    
    fetchData() {
        this.props.dataSource.fetchProductFamilies(this.handleProductFamilyData, this.handleError);
    }

    handleProductFamilyData(productFamilies) {
        const products = this.extractProducts(productFamilies);
        this.setState({
            productFamilies: productFamilies,
            minimizedProducts: products
        });
    }
    
    extractProducts(productFamilies) {
        let products = [];
        productFamilies.forEach(function(productFamily) {
            products = products.concat(productFamily.products);
        });
        return products;
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
        } else if(this.state.productFamilies) {
            component = (
                <div>
                    <Header 
                        dataSource={this.props.dataSource}
                        dataSender={this.props.dataSender} />
                    <Diagram
                        products={this.state.minimizedProducts}
                        onStateExcludeInput={this.handleExcludeStateInput} />
                    <SearchBar
                        onChangeSearchInput={this.handleSearchInput}
                        searchText={this.state.searchText}/>
                    <ProductCardGrid
                        productFamilies={this.state.productFamilies}
                        searchText={this.state.searchText}
                        excludedStates={this.state.excludedStates} />
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