import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconHome from 'material-ui/svg-icons/action/home';
import IconSettings from 'material-ui/svg-icons/action/settings';

class Header extends Component {
	render() {
		return (
			<AppBar
				title={<span>Argos</span>}
				iconElementLeft={<IconButton><IconHome/></IconButton>}
				iconElementRight={<IconButton><IconSettings/></IconButton>}
			/>
		);
	}
}

export default Header;