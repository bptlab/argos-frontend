import React from 'react';
import ConnectionComponent from './Utils/ConnectionComponent.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ThemeStyles from './ThemeStyles';
import {connect, PromiseState} from "react-refetch";
import config from './config/config.js';

class App extends ConnectionComponent {

    render() {
        PromiseState.all([this.props.hierarchy]);
        if (!window.hierarchy) {
            window.hierarchy = this.props.hierarchy.value;
        }

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(ThemeStyles)}>
                {this.props.children}
            </MuiThemeProvider>
        );
    }
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
    hierarchy: config.backendRESTRoute + `/entitytype/hierarchy`,
}))(App);
