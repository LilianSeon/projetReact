import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Home from './component/Home';

class App extends Component{
  render(){
    return (
      <BrowserRouter>
        <Route exact path="/" component={Home}/>
      </BrowserRouter>
    );
  }
}

export default App;
