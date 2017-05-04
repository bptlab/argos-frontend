import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ThemeStyles from './ThemeStyles';

class App extends Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(ThemeStyles)}>
                {this.props.children}
            </MuiThemeProvider>
        );
    }
}

export default App;
