import React, { Component } from 'react';

class ProductDetails extends Component {
    render() {
        return (
            <div className="product-details">
                <div className="row">
                    <h2 className="col area-title">Produkt Details</h2>
                </div>
                <div className="row">
                    <p className="col-4">Marke:</p>
                    <p className="col">{this.props.product.brand}</p>
                </div>
                <div className="row">
                    <p className="col-4">Produktfamilie:</p>
                    <p className="col">{this.props.product.family}</p>
                </div>
                <div className="row">
                    <p className="col-4">Seriennummer:</p>
                    <p className="col">{this.props.product.id}</p>
                </div>
            </div>
        );
    }
}

export default ProductDetails;