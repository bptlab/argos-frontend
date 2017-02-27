import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './App/App';
import ProductView from './ProductView/ProductView.js';
import DashboardView from './DashboardView/DashboardView.js';
import ProductFetcher from './ProductFetcher/ProductFetcher.js';
import RESTInterfaceMock from './ProductFetcher/RESTInterfaceMock.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import './index.scss';

const API_SERVER_URL = "172.16.20.158"; //172.16.20.158
const API_SERVER_PORT = 8989;
const notificationList = [];

function registerNotifications(callback) {
    notificationList.push(callback);
}
function notificationCallback(type, message) {
    notificationList.forEach(function(callback){
        callback(type, message);
    });
}
const dataSource = new ProductFetcher(API_SERVER_URL, API_SERVER_PORT, notificationCallback);
ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={App} params={{ registerForNotificationsCallback: registerNotifications}}>
            <IndexRoute component={() => (<DashboardView dataSource={dataSource} />)} />
            <Route path="/product/:productID"
                   component={(routeObject) => (
                       <ProductView dataSource={dataSource} params={routeObject.params} />
                   )}/>
        </Route>
    </Router>),
    document.getElementById('root')
);