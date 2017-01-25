import React, { Component } from 'react';
import './Header.css';
import StatusPoint from './StatusPoint/StatusPoint.js';

class Header extends Component {
    render() {
        return (
            <div className="row d-flex align-items-center">
                <div className="col-1 d-flex justify-content-around">
                    <a className="btn btn-secondary" href="/" role="button">
                        <i className="fa fa-home" aria-hidden="true"></i>
                    </a>
                </div>
                <div className="col-10 d-flex justify-content-around">
                    <h1>{this.props.product.metaData.label}</h1>
                </div>
                <div className="col-1 d-flex justify-content-around">
                    <StatusPoint product={this.props.product}/>
                </div>
            </div>

        );
    }
}

export default Header;