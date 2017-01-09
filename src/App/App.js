import React, {Component} from 'react';
import ProductCard from '../ProductCard/ProductCard.js';
import Grid from '../Grid/ProductCardGrid.js';
import SearchBar from '../SearchBar/SearchBar.js'
import './App.scss';
import './bootstrap.css'

class App extends Component {
    componentDidMount() {
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:8080/unicorn/webapi/REST/EventQuery/REST", false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        let response = JSON.parse(xhttp.responseText);
        console.log(response)
    }

    render() {
        return (
            <div>
                <Grid>
                    <ProductCard category="warning"/>
                    <ProductCard category="error"/>
                    <ProductCard category="success"/>
                </Grid>
            </div>);
    }
}

export default App;
