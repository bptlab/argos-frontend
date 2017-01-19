import React, { Component } from 'react';
import './Header.css';
import StatusPoint from './StatusPoint/StatusPoint.js';

class Header extends Component {
    render() {
        return (
            <div>
                <a className="btn btn-secondary" href="/" role="button"><i className="fa fa-home" aria-hidden="true"></i>TEST</a>
                <h1>{this.props.product.metaData.label}</h1>
                <StatusPoint product={this.props.product}/>
            </div>
        );
    }
}

export default Header;