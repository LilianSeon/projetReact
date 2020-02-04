import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Inscription from './component/Inscription';
import Connexion from './component/Connexion';

class App extends Component{
  render(){
    return (
      <BrowserRouter>
        <Route exact path="/" component={Home}/>
        <Route exact path="/inscription" component={Inscription}/>
        <Route exact path="/connexion" component={Connexion}/>
      </BrowserRouter>
    );
  }
}

export default App;
