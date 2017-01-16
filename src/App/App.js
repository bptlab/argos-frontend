import React, {Component} from 'react';
import ProductCardGrid from '../ProductCardGrid/ProductCardGrid.js';
import SearchBar from '../SearchBar/SearchBar.js'
import './App.css';
import './bootstrap.scss'
import Diagram from '../Diagram/Diagram'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
        this.handleUserInput = this.handleUserInput.bind(this)
    }

    handleUserInput(searchText) {
        this.setState({searchText: searchText});
    }

    componentDidMount() {
    }

    render() {
        let listOfPorducts = JSON.parse('[{"numberOfDevices":254,"numberOfEvents":2001,"productionStart":"Feb 1, 2016 12:00:00 AM","state":"RUNNING","name":"example family","id":47, "metaData": {"label":"product label 002", "brand":"Testbrand1", "orderNumber":1234, "statusDescription":"everything is broken!"}}, {"numberOfDevices":1337,"numberOfEvents":9001,"productionStart":"Feb 1, 4099 12:00:00 AM","state":"ERROR","name":"example family","id":42, "metaData": {"label":"product label 001", "brand":"Testbrand1", "orderNumber":1234, "statusDescription":"everything is broken!"}}]');
        return (
            <div className="AppWrapper">
                <Diagram products={listOfPorducts} />
                <SearchBar searchText={this.state.searchText} onUserSearchInput={this.handleUserInput} />
                <ProductCardGrid searchText={this.state.searchText} products={listOfPorducts} />
            </div>);
    }
}

export default App;
