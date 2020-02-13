import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Materialize from "materialize-css";

class Footer extends Component{

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
            <li><Link class="grey-text text-lighten-3" to={'/adminfilm'}>Admin</Link></li>
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
            <li><Link class="grey-text text-lighten-3" onClick={() => {this.disconnect()}}>Déconnexion</Link></li>
          )
        }
      }

    render(){
        return(
            <footer class="page-footer teal darken-1 z-depth-1">
                <div class="container">
                    <div class="row">
                    <div class="col l6 s12">
                        <h5 class="white-text">Popcorn</h5>
                        <p class="grey-text text-lighten-4">Le Popcorn, maïs soufflé ou maïs éclaté est une cérale soufflée produite par un chauffage fort de grains de maïs.</p>
                    </div>
                    <div class="col l4 offset-l2 s12">
                        <h5 class="white-text">Links</h5>
                        <ul>
                        <li><Link class="grey-text text-lighten-3" to={'/'}>Home</Link></li>
                        <li><Link class="grey-text text-lighten-3" to={'/connexion'}>Connexion</Link></li>
                        {this.setting()}
                        {this.out()}
                        </ul>
                    </div>
                    </div>
                </div>
                <div class="footer-copyright">
                    <div class="container">
                    © 2020 Copyright Lilian Company
                    <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
                    </div>
                </div>
            </footer>
        )
    }

}

export default Footer;