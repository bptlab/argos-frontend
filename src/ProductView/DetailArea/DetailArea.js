import React, { Component } from 'react';
import './DetailArea.css';
import ProductDetails from './ProductDetails/ProductDetails.js'
import StatusDerivation from './StatusDerivation/StatusDerivation.js'

class DetailArea extends Component {
    render() {
        return (
            <div>
                <ProductDetails product={this.props.product}/>
                <StatusDerivation product={this.props.product}/>
            </div>
        );
    }
}

export default DetailArea;
