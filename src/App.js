import React, { Component } from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <Hero/>
      </div>
    );
  }
}

export default App;
