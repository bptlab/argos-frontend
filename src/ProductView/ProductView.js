import React, { Component } from 'react';
import './ProductView.css';
import Header from './Header/Header.js';
import DetailArea from './DetailArea/DetailArea.js';
import Filterbar from './Filterbar/Filterbar.js';
import Tabbar from './Tabbar/Tabbar.js';
import EventList from './EventList/EventList.js';

class ProductView extends Component {
    render() {
        const product = JSON.parse('{"numberOfDevices":83,"numberOfEvents":2001,"productionStart":"Feb 1, 2016 12:00:00 AM","state":"RUNNING","name":"example family","id":483, "metaData": {"label":"product label 002", "brand":"Testbrand2", "orderNumber":1234, "statusDescription":"everything is broken!"}}');
        return (
            <div>
                <Header product={product}/>
                <DetailArea/>
                <Filterbar/>
                <Tabbar/>
                <EventList/>
            </div>
        );
    }
}

export default ProductView;
