import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './App/App';
import ProductView from './ProductView/ProductView.js';
import DashboardView from './DashboardView/DashboardView.js';
import DataReceiver from './RemoteHandler/DataReceiver.js';
import DataTransmitter from './RemoteHandler/DataTransmitter.js';
import ServerMock from './RemoteHandler/ServerMock.js';
import {argosConfig} from './config/argosConfig';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import './index.scss';

let backendHost, backendPort;
if (argosConfig.sameServer) {
    backendHost = window.location.hostname;
    backendPort = 8989;
} else {
    backendHost = argosConfig.backendHost;
    backendPort = argosConfig.backendPort;
}

//### Data-Source-Initialization ###
const dataSource = new DataReceiver(
    backendHost,
    backendPort,
    notificationCallback
);
const dataSender = new DataTransmitter(
    backendHost,
    backendPort,
    notificationCallback
);
if(argosConfig.useBackendMock) {
    dataSource.client.client = new ServerMock();
    dataSender.client.client = dataSource.client.client;
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
            <IndexRoute component={() => (<DashboardView 
                dataSource={dataSource}
                dataSender={dataSender} />)} />
            <Route path={`/` + argosConfig.routeNameDetailView+`/:productID`}
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