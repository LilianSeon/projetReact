import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Inscription from './component/Inscription';
import Connexion from './component/Connexion';
import Detail from './component/Detail';
import AdminFilm from './component/AdminFilm';
import AjoutFilm from './component/AjoutFilm';

class App extends Component{
  render(){
    return (
      <BrowserRouter>
        <Route exact path="/" component={Home}/>
        <Route exact path="/inscription" component={Inscription}/>
        <Route exact path="/connexion" component={Connexion}/>
        <Route exact path="/detail/:id" component={Detail}/>
        <Route exact path="/adminfilm" component={AdminFilm}/>
        <Route exact path="/ajoutfilm" component={AjoutFilm}/>
      </BrowserRouter>
    );
  }
}

export default App;
