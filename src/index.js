import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './App/App';
import DetailView from './DetailView/DetailView';
import DashboardView from './DashboardView/DashboardView';
import './index.css';

ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={DashboardView}/>
            <Route path="/product/:productID" component={DetailView}/>
        </Route>
    </Router>),
  document.getElementById('root')
);
