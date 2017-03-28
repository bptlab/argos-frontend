import React, { Component } from 'react';
import ProductHeader from './ProductHeader/ProductHeader.js';
import ConfigurationHeader from './ConfigurationHeader/ConfigurationHeader.js';

class Header extends Component {
    render() {
        let test = {
            "1.0":[ "4.0.0", "4.0.1", "4.0.2" ],
            "1.1":[ "4.1.0", "4.1.1", "4.1.2" ],
            "1.2":[ "4.2.0", "4.2.1", "4.2.2" ],
            "2.0":[ "5.0.0", "5.0.1", "5.0.2" ]
        };
        return (
            <header>
                <ProductHeader product={this.props.product}/>
                <ConfigurationHeader product={this.props.product} configurations={test} setProductConfiguration={this.props.setProductConfiguration}/>
            </header>
        );
    }
}

export default Header;
