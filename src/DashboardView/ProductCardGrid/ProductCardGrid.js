import React, { Component } from 'react';
import ProductCard from './ProductCard/ProductCard.js';

class ProductCardGrid extends Component {
    searchMatches(product, searchText) {
        if (!searchText) {
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
            const searchQuery = searchText.toString().toLowerCase();
            return (productAttribute.indexOf(searchQuery) > -1);
        });
    }

    render() {
        return (
            <div className="container">
                <div id="product-family-accordion" role="tablist">
                    {this.props.productFamilies.map((productFamily, index) =>  {
                        return (
                            <div className="card" key={index}>
                                <a className={index !== 0 ? 'collapsed' : ''}
                                   data-toggle="collapse"
                                   data-parent="#product-family-accordion"
                                   href={`#collapse-product-family-` + index}>
                                    <div className="card-header" role="tab" id={`product-family-header-` + index}>
                                        <h5 className="mb-0">
                                            {productFamily.name}
                                        </h5>
                                    </div>
                                </a>

                                <div id={`collapse-product-family-` + index}
                                     className={index === 0 ? 'collapse show' : 'collapse'}
                                     role="tabpanel">
                                    <div className="card-block">
                                        <div className="row">
                                            {productFamily.products.map((product, index) =>  {
                                                if(this.searchMatches(product, this.props.searchText) &&
                                                    this.props.excludedStates.indexOf(product.state) === -1) {
                                                    return (
                                                        <ProductCard
                                                            key={index}
                                                            product={product}/>
                                                    );
                                                } else {
                                                    return false;
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
export default ProductCardGrid;