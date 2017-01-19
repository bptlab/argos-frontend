import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import App from './App/App';
import DetailView from './DetailView/DetailView';
import './index.css';

ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={App} />
        <Route path="/product" component={DetailView} />
    </Router>),
  document.getElementById('root')
);
