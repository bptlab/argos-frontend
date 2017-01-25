import React, { Component } from 'react';
import './DetailArea.css';
import ProductDetails from './ProductDetails/ProductDetails.js'
import StatusDerivation from './StatusDerivation/StatusDerivation.js'

class DetailArea extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <ProductDetails product={this.props.product}/>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <StatusDerivation product={this.props.product}/>
                </div>
            </div>
        );
    }
}

export default DetailArea;
