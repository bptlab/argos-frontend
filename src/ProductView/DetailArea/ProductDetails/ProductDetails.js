import React, { Component } from 'react';
import './ProductDetails.css';

class ProductDetails extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <h2 className="col">Produkt Details</h2>
                </div>
                <div className="row">
                    <h4 className="col-4">Marke</h4>
                    <h5 className="col">{this.props.product.metaData.brand}</h5>
                </div>
                <div className="row">
                    <h4 className="col-4">Produktfamilie</h4>
                    <h5 className="col">{this.props.product.name}</h5>
                </div>
                <div className="row">
                    <h4 className="col-4">Seriennummer</h4>
                    <h5 className="col">{this.props.product.id}</h5>
                </div>
            </div>
        );
    }
}

export default ProductDetails;