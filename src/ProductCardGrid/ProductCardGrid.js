import React, { Component } from 'react';
import './ProductCardGrid.css';
import ProductCard from '../ProductCard/ProductCard.js';

class ProductCardGrid extends Component {

    searchMatches(product) {
        if (!this.props.searchText) {
            return true;
        }
        else if (product.metaData.brand.indexOf(this.props.searchText) > -1) {
            return true;
        }
        return (product.metaData.label.indexOf(this.props.searchText) > -1);
    }

    render() {
        return (
            <div className="ProductCardGrid">
                {this.props.products.map((product) =>  {
                    if(this.searchMatches(product)) {
                        return (<ProductCard key={product.id} product={product}/>)
                    }
                })}
            </div>
        );
    }
}

export default ProductCardGrid;
