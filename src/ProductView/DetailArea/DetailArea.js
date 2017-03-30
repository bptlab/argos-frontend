import React, { Component } from 'react';
import ProductDetails from './ProductDetails/ProductDetails.js';
import StatusDerivation from './StatusDerivation/StatusDerivation.js';

class DetailArea extends Component {

    componentWillMount() {
        this.setConfiguration(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
            this.setConfiguration(nextProps);
        }
    }

    setConfiguration(props) {
        let configuration = props.configuration;
        if(props.showAllConfigurations || !props.configuration) {
            configuration = props.product;
        }
        this.setState({
            configuration: configuration
        });
    }

    render() {
        return (
            <div className="detail-area">
                <ProductDetails product={this.props.product}/>
                <StatusDerivation product={this.props.product}/>
            </div>
        );
    }
}

export default DetailArea;
