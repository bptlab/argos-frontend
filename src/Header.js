import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconHome from 'material-ui/svg-icons/action/home';
import IconSettings from 'material-ui/svg-icons/action/settings';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import config from './config/config'
import { css } from 'aphrodite';
import DefinitionStyles from './DefinitionStyles';

class Header extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route path="/grid/:entityId" component={() => <h2>Grid</h2>}/>
					<Route path="/details" component={() => <h2>Detail</h2>}/>
					<Route path="/settings" component={() => <h2>Settings</h2>}/>
				</div>
			</Router>
		);
    }
}
export default Header;

/*<AppBar
 title={<span>{config.projectName}</span>}
 iconElementLeft={<IconButton><IconHome/></IconButton>}
 iconElementRight={<IconButton><IconSettings/></IconButton>}
 className="primary-color"
 />*/
