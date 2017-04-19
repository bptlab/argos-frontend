import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import Settings from 'material-ui/svg-icons/action/settings';

class Header extends Component {
	render() {
		return (
			<AppBar
				title={<span>Argos</span>}
				iconElementLeft={<IconButton><ActionHome/></IconButton>}
				iconElementRight={<IconButton><Settings/></IconButton>}
			/>
		);
	}
}

export default Header;