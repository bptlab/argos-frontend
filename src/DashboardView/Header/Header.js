import React, { Component } from 'react';
import Boiler from '../../assets/icons/boiler.svg';

class Header extends Component {
    render() {
        return (
            <header>
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="hidden-xs-down col-sm-1 d-flex justify-content-around">
                            <a href="/">
                                <img className="product-icon" src={Boiler} alt="Overview page"/>
                            </a>
                        </div>
                        <div className="col-xs-12 col-sm-10 d-flex justify-content-around">
                            <h1 className="dashboard-title">Early Warning Dashboard</h1>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
export default Header;