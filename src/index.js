import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './App/App';
import ProductView from './ProductView/ProductView';
import DashboardView from './DashboardView/DashboardView';
import './index.css';
import ProductFetcher from './ProductFetcher/ProductFetcher.js';
import RESTInterfaceMock from './ProductFetcher/RESTInterfaceMock';

const API_SERVER_URL = "http://172.16.20.158";
const API_SERVER_PORT = 8989;

const dataSource = new ProductFetcher(API_SERVER_URL, API_SERVER_PORT);
dataSource.setClient(new RESTInterfaceMock());
ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={() => (<DashboardView products={dataSource.receiveProducts()} />)} />
            <Route path="/product/:productID"  component={(routeObject) => (<ProductView dataSource={dataSource} params={routeObject.params} />)}/>
        </Route>
    </Router>),
    document.getElementById('root')
);