import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import './App.css';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Header/>
	                {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
