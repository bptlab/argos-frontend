import React, {Component} from 'react';
import './App.css';
import './bootstrap.scss'

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
