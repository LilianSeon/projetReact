import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.png';
import Materialize from "materialize-css";

class Menu extends Component{

  constructor(props) {
    super(props);
    this.state = {
        id: '',
        isAuth: '',
        user_role: ''
    };
  }

  componentDidMount(){
    let elems = document.querySelectorAll('.tooltipped');
    Materialize.Tooltip.init(elems, {});
  }

  setting(){
    if (localStorage.user_role === "1") {

      if(localStorage.toast === "true"){
        Materialize.toast({html: "<span>Vous êtes déconnecté en tant qu'Admin!</span>"});
        localStorage.setItem('toast', JSON.stringify(false));
      }

      return(
        <li className="tooltipped" data-position="bottom" data-tooltip="Admin"><Link to='/adminFilm'>
          <i className="material-icons">build</i></Link>
        </li>
      )
    }
  }

  disconnect(){
    localStorage.setItem('idUser', "");
    localStorage.setItem('user_role', "");
    localStorage.setItem('isAuth', "false");

    if(localStorage.isAuth === "false"){
      Materialize.toast({html: '<span>Vous êtes déconnecté !</span>'})
    }
    localStorage.setItem('isAuth', "");
  }

  out(){
    if (localStorage.isAuth === "true") {
      return(
        <li className="tooltipped" data-position="bottom" data-tooltip="Déconnexion"><a href="#">
          <i className="material-icons" onClick={() => {this.disconnect()}}>exit_to_app</i></a>
        </li>
      )
    }
  }


  render(){
      return(
      <nav>
          <div className="nav-wrapper teal darken-1 z-depth-1">
            <img src={Logo} width="65" height="64" alt="" className="left"/>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li className="tooltipped" data-position="bottom" data-tooltip="Home"><Link to={'/'}><i className="material-icons">home</i></Link></li>
              <li className="tooltipped" data-position="bottom" data-tooltip="Connexion"><Link to={'/connexion'}><i className="material-icons">person</i></Link></li>
              {this.setting()}
              {this.out()}
            </ul>
          </div>
      </nav>
      )
  }
}

export default Menu;