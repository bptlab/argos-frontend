import React, {Component} from 'react';
import './App.css';
import './bootstrap.scss'
import DashboardView from '../DashboardView/DashboarView.js';

class App extends Component {

    render() {
        let listOfPorducts = JSON.parse('[{"numberOfDevices":254,"numberOfEvents":2001,"productionStart":"Feb 1, 2016 12:00:00 AM","state":"WARNING","name":"example family","id":47, "metaData": {"label":"product label 002", "brand":"Testbrand1", "orderNumber":1234, "statusDescription":"everything is broken!"}}, {"numberOfDevices":1337,"numberOfEvents":9001,"productionStart":"Feb 1, 4099 12:00:00 AM","state":"ERROR","name":"example family","id":42, "metaData": {"label":"product label 001", "brand":"Testbrand1", "orderNumber":1234, "statusDescription":"everything is broken!"}}]');
        return (<DashboardView products={listOfPorducts} />);
    }
}

export default App;
