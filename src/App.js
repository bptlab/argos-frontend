import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import { Container } from 'react-grid-system';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ThemeStyles from './ThemeStyles';

class App extends Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(ThemeStyles)}>
                <div>
                    <Header/>
                    <Container>
	                    {this.props.children}
                    </Container>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
