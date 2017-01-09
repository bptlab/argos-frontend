import React, { Component } from 'react';
import ProductCard from '../ProductCard/ProductCard.js';
import Grid from '../Grid/ProductCardGrid.js';
import SearchBar from '../SearchBar/SearchBar.js'
import './App.css';
import './bootstrap.css'

class App extends Component {
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
