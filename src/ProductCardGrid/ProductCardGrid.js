import React, { Component } from 'react';
import './ProductCardGrid.css';
import ProductCard from '../ProductCard/ProductCard.js';

class ProductCardGrid extends Component {

    searchMatches(product) {
        if (!this.props.searchText) {
            return true;
        }
        let searchFields = [product.metaData.brand, product.metaData.label, product.metaData.orderNumber,
            product.productionStart];
        for(let index in searchFields) {
            if (searchFields[index].toString().indexOf(this.props.searchText) > -1) {
                return true;
            }
        }
        return false;
    }

    render() {
        return (
            <div className="ProductCardGrid">
                {this.props.products.map((product) =>  {
                    if(this.searchMatches(product)) {
                        return (<ProductCard key={product.id} product={product}/>);
                    } else {
                        return false;
                    }
                })}
            </div>
        );
    }
}

export default ProductCardGrid;
