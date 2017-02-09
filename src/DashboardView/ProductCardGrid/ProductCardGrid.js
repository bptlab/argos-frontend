import React, { Component } from 'react';
import ProductCard from './ProductCard/ProductCard.js';

class ProductCardGrid extends Component {
    searchMatches(product) {
        if (!this.props.searchText) {
            return true;
        }
        //SEARCH-CONFIG: Edit this to define relevant fields for overview search
        const searchFields = [
            product.name,
            product.orderNumber,
            product.numberOfDevices,
            product.productionStart,
            product.numberOfEvents
        ];

        return searchFields.some((searchField) => {
            const productAttribute = searchField.toString().toLowerCase();
            const searchQuery = this.props.searchText.toString().toLowerCase();
            return (productAttribute.indexOf(searchQuery) > -1);
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.props.products.map((product) =>  {
                        if(this.searchMatches(product)) {
                            return (
                                <ProductCard
                                    key={product.id}
                                    product={product}/>
                            );
                        } else {
                            return false;
                        }
                    })}
                </div>
            </div>
        );
    }
}
export default ProductCardGrid;