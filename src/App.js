import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';
import About from './pages/about';
import Contact from './pages/contact';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Hero} />
            <Route path="/about-us" component={About} />
            <Route path="/contact-us" component={Contact} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
