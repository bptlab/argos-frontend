import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/scss/big-grid.scss'
import 'font-awesome/css/font-awesome.css'
import $ from 'jquery';
window.jQuery = window.$ = $;
import tether from 'tether';
global.Tether = tether;
require('bootstrap');

class App extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default App;
