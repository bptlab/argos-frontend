import React, { Component } from 'react';
import './Header.css';
import StatusPoint from './StatusPoint/StatusPoint.js';

class Header extends Component {
    render() {
        return (
            <header>
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-1 d-flex justify-content-around">
                            <a href="/">
                                <i className="home-button fa fa-home" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div className="col-10 d-flex justify-content-around">
                            <h1>{this.props.product.metaData.label}</h1>
                        </div>
                        <div className="col-1 d-flex justify-content-around">
                            <StatusPoint product={this.props.product}/>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;