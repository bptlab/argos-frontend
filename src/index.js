import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './App/App';
import DetailView from './DetailView/DetailView';
import DashboardView from './DashboardView/DashboardView';
import './index.css';
import ProductFetcher from './ProductFetcher/ProductFetcher.js';
import RESTInterfaceMock from './ProductFetcher/RESTInterfaceMock';

const API_SERVER_URL = "localhost";
const API_SERVER_PORT = 3030;

const dataSource = new ProductFetcher(API_SERVER_URL, API_SERVER_PORT);
dataSource.setClient(new RESTInterfaceMock());
ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={() => (<DashboardView products={dataSource.receiveAllProducts()} />)} />
            <Route path="/product/:productID" component={DetailView}/>
        </Route>
    </Router>),
  document.getElementById('root')
);
