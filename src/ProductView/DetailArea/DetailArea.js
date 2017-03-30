import React, { Component } from 'react';
import ProductDetails from './ProductDetails/ProductDetails.js';
import StatusDerivation from './StatusDerivation/StatusDerivation.js';

class DetailArea extends Component {
    constructor(props) {
        super(props);
        this.setConfiguration(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setConfiguration(nextProps);
    }

    setConfiguration(props) {
        let configuration = props.configuration;
        if(props.showAllConfigurations || !props.configuration) {
            configuration = props.product;
        }
        this.state = {
            configuration: configuration
        };
    }

    render() {
        return (
            <div className="detail-area container">
                <div className="row detail-row">
                    <div className="detail-area-block col-xs-12 col-sm-6">
                        <ProductDetails product={this.props.product}/>
                    </div>
                    <div className="detail-area-block col-xs-12 col-sm-6">
                        <StatusDerivation configuration={this.state.configuration}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailArea;
