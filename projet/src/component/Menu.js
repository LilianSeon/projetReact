import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.png'

class Menu extends Component{


    render(){
        return(
        <nav>
            <div className="nav-wrapper teal darken-1">
              <img src={Logo} width="65" height="65"/>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to={'/'}>Home</Link></li>
              </ul>
            </div>
        </nav>
        )
    }
}

export default Menu;