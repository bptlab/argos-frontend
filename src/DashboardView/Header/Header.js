import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <header>
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-1 d-flex justify-content-around">
                            <a href="/">
                                <i className="home-button fa fa-home" aria-hidden="true" />
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