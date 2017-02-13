import React, { Component } from 'react';
import ProductDetails from './ProductDetails/ProductDetails.js';
import StatusDerivation from './StatusDerivation/StatusDerivation.js';

class DetailArea extends Component {
    render() {
        return (
            <div className="detail-area container">
                <div className="row detail-row">
                    <div className="detail-area-block col-xs-12 col-sm-6">
                        <ProductDetails product={this.props.product}/>
                    </div>
                    <div className="detail-area-block col-xs-12 col-sm-6">
                        <StatusDerivation product={this.props.product}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailArea;
