import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GridView from './GridView/GridView';
import DetailView from './DetailView/DetailView';
import './index.css';
import entities from './MockData/Entities'

ReactDOM.render(
	<App>
		<DetailView/>
	</App>,
	document.getElementById('root')
);
