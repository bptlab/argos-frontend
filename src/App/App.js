import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

// Importing jQuery in ES6 style
import $ from "jquery";

// We need to expose jQuery as global variable
window.jQuery = window.$ = $;

import tether from 'tether';
global.Tether = tether;

// ES6 import does not work it throws error: Missing jQuery
// using Node.js style import works without problems
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
