import React, { Component } from 'react';
import StatusPoint from './StatusPoint/StatusPoint.js';

class Header extends Component {
    render() {
        return (
            <header>
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="hidden-xs-down col-sm-1 d-flex justify-content-center">
                            <a href="/#">
                                <i className="home-button fa fa-home" />
                            </a>
                        </div>
                        <div className="col-xs-12 col-sm-10 d-flex justify-content-around">
                            <h1 className="dashboard-title">{this.props.product.name}</h1>
                        </div>
                        <div className="hidden-xs-down col-sm-1 d-flex justify-content-around">
                            <StatusPoint product={this.props.product}/>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;