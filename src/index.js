import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './App/App';
import ProductView from './ProductView/ProductView.js';
import DashboardView from './DashboardView/DashboardView.js';
import ProductFetcher from './ProductFetcher/ProductFetcher.js';
import RESTInterfaceMock from './ProductFetcher/RESTInterfaceMock.js';
import $ from 'jquery';
window.jQuery = window.$ = $;
import tether from 'tether';
global.Tether = tether;
require('bootstrap');
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import './index.scss';

const API_SERVER_URL = "localhost";
const API_SERVER_PORT = 8989;

const dataSource = new ProductFetcher(API_SERVER_URL, API_SERVER_PORT);
dataSource.setClient(new RESTInterfaceMock());
ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={() => (<DashboardView dataSource={dataSource} />)} />
            <Route path="/product/:productID"
                   component={(routeObject) => (
                       <ProductView dataSource={dataSource} params={routeObject.params} />
                   )}/>
        </Route>
    </Router>),
    document.getElementById('root')
);