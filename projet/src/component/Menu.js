import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/logo3.png';
import Materialize from "materialize-css";

class Menu extends Component{

  constructor(props) {
    super(props);
    this.state = {
        id: '',
        isAuth: '',
        user_role: ''
    };
    let elems = document.querySelectorAll('.tooltipped');
    Materialize.Tooltip.init(elems,{});
  }


  componentDidMount(){
    let elems = document.querySelectorAll('.tooltipped');
    Materialize.Tooltip.init(elems,{});
  }

  setting(){
    if (localStorage.user_role === "1") {

      if(localStorage.toast === "true"){
        Materialize.toast({html: "<span>Vous êtes déconnecté en tant qu'Admin!</span>"});
        localStorage.setItem('toast', JSON.stringify(false));
      }

      return(
        <li className="tooltipped" data-position="bottom" data-tooltip="Admin"><Link to='/adminFilm'>
          <i className="material-icons">settings_applications</i></Link>
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
        <li className="tooltipped" data-position="bottom" data-tooltip="Déconnexion"><Link to="">
          <i className="material-icons" onClick={() => {this.disconnect()}}>exit_to_app</i></Link>
        </li>
      )
    }
  }


  render(){
      return(
      <nav>
          <div className="nav-wrapper teal darken-1 z-depth-1">
          <Link to={'/'}><img src={Logo} width="65" height="64" alt="" className="left tooltipped logo" data-position="bottom" data-tooltip="Popcorn"/></Link>
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