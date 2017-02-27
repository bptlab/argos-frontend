import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './App/App';
import ProductView from './ProductView/ProductView.js';
import DashboardView from './DashboardView/DashboardView.js';
import ProductFetcher from './ProductFetcher/ProductFetcher.js';
import RESTInterfaceMock from './ProductFetcher/RESTInterfaceMock.js';
import {argosConfig} from './config/argosConfig';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import './index.scss';

//### Data-Source-Initialization ###
const dataSource = new ProductFetcher(
    argosConfig.backendHost,
    argosConfig.backendPort,
    notificationCallback
);
if(argosConfig.useBackendMock) {
    dataSource.client = new RESTInterfaceMock();
}

//### Notification-Initialization ###
const notificationList = [];
function registerNotifications(callback) {
    notificationList.push(callback);
}
function notificationCallback(type, message) {
    notificationList.forEach(function(callback){
        callback(type, message);
    });
}

//### React-Initialization ###
ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={App} params={{ registerForNotificationsCallback: registerNotifications}}>
            <IndexRoute component={() => (<DashboardView dataSource={dataSource} />)} />
            <Route path={`/` + argosConfig.routeNameDetailView+`/:productID`}
                   component={(routeObject) => (
                       <ProductView dataSource={dataSource} params={routeObject.params} />
                   )}/>
        </Route>
    </Router>),
    document.getElementById('root')
);