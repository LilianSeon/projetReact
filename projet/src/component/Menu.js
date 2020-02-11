import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.png'

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

    if (typeof this.props.isAdmin !== "undefined") {
      this.setState({
        ...this.state,
        id: this.props.id,
        isAuth: this.props.isAuth,
        user_role: this.props.isAdmin
      })
    }
    
  }

  setting(){
    if (this.props.isAdmin) {
      console.log(this.state)
      return(
        <li title="Admin"><Link to={{
          pathname:'/adminFilm',
          state:{
              id: this.state.id,
              isAuth: this.state.isAuth,
              user_role: this.state.user_role
          }
        }}>
        <i className="material-icons">settings</i></Link></li>
      )
    }
  }


  render(){
      return(
      <nav>
          <div className="nav-wrapper teal darken-1">
            <img src={Logo} width="65" height="64" alt="" className="left"/>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li title="Home"><Link to={'/'}><i className="material-icons">home</i></Link></li>
              <li title="Connexion"><Link to={'/connexion'}><i className="material-icons">person</i></Link></li>
              {this.setting()}
            </ul>
          </div>
      </nav>
      )
  }
}

export default Menu;