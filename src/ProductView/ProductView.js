import React, { Component } from 'react';
import './ProductView.css';
import Header from 'Header/Header.js';
import DetailArea from 'DetailArea/DetailArea.js';
import Filterbar from 'Filterbar/Filterbar.js';
import Tabbar from 'Tabbar/Tabbar.js';
import EventList from 'EventList/EventList.js';

class ProductView extends Component {
    render() {
        return (
            <div>
                <Header/>
                <DetailArea/>
                <Filterbar/>
                <Tabbar/>
                <EventList/>
            </div>
        );
    }
}

export default ProductView;
