import React, { Component } from 'react';
import './Header.css';
import Boiler from '../../assets/icons/boiler.svg'

class Header extends Component {
    render() {
        return (
            <header>
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-1 d-flex justify-content-around">
                            <a href="/">
                                <img className="product-icon" src={Boiler}/>
                            </a>
                        </div>
                        <div className="col-10 d-flex justify-content-around">
                            <h1>Early Warning Dashboard</h1>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
export default Header;