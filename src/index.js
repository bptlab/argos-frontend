import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './App/App';
import ProductView from './ProductView/ProductView.js';
import DashboardView from './DashboardView/DashboardView.js';
import DataReceiver from './RemoteHandler/DataReceiver.js';
import DataTransmitter from './RemoteHandler/DataTransmitter.js';
import RESTInterfaceMock from './RemoteHandler/RESTInterfaceMock.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import './index.scss';

const API_SERVER_URL = "localhost";
const API_SERVER_PORT = 8989;

const dataSource = new DataReceiver(API_SERVER_URL, API_SERVER_PORT);
const dataSender = new DataTransmitter(API_SERVER_URL, API_SERVER_PORT);
dataSource.setClient(new RESTInterfaceMock());
ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={() => (<DashboardView dataSource={dataSource} />)} />
            <Route path="/product/:productID"
                   component={(routeObject) => (
                       <ProductView
                           dataSource={dataSource}
                           dataSender={dataSender}
                           params={routeObject.params} />
                   )}/>
        </Route>
    </Router>),
    document.getElementById('root')
);