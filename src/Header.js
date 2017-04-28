import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconHome from 'material-ui/svg-icons/action/home';
import IconSettings from 'material-ui/svg-icons/action/settings';
import config from './config/config'
import { css } from 'aphrodite';
import DefinitionStyles from './DefinitionStyles';

class Header extends Component {
	render() {
		return (
			<AppBar
				title={<span>{config.projectName}</span>}
				iconElementLeft={<IconButton><IconHome/></IconButton>}
				iconElementRight={<IconButton><IconSettings/></IconButton>}
			/>
		);
	}
}

export default Header;