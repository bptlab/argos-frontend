import React, { Component } from 'react';
import './ProductDetails.css';

class ProductDetails extends Component {
    render() {
        return (
            <div>
                <h2>Produkt Details</h2>

                <h4>Marke</h4>
                <h4>Produktfamilie</h4>
                <h4>Seriennummer</h4>

                <h5>{this.props.product.metaData.brand}</h5>
                <h5>{this.props.product.name}</h5>
                <h5>{this.props.product.id}</h5>
            </div>
        );
    }
}

export default ProductDetails;