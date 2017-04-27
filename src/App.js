import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import { css } from 'aphrodite';
import AppStyles from './App-styles';

class App extends Component {

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Header/>
                    <div className={css(AppStyles.container)}>
	                    {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
