import React, {Component} from 'react';
import Menu from '../component/Menu';
import UserService from '../service/user.service';
import { Link } from 'react-router-dom';

class Inscription extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            user_role: 0
        };
      }

      getEmail(e){ // Récupère l'email de l'utilisateur pour le mettre dans le state
          this.setState({
              email: e.target.value
          });
      }

      getPassword(e){ // Récupère le password de l'utilisateur pour le mettre dans le state
          this.setState({
              password: e.target.value
          });
      }

    role(e){ // Récupère le role de l'utilisateur pour le mettre dans le state
        if(e.target.checked){ // Admin
            this.setState({
                user_role: 1
            });
        }else{ // Simple user
            this.setState({
                user_role: 0
            });
        }
    }

    async addUser(e){ // Envoie de la requête pour ajouter un utilisateur en base de donnée
        e.preventDefault();
        let response = await UserService.create(this.state); // Ajoute un user
            if(response.ok){
                window.location.replace("/connexion");
            }else{
                console.log(response.error);
            }
    }

    render(){
        return(
            <div>
                <Menu/>
                <br/>
                <Link to={'/connexion'} className="waves-effect waves-light btn"><i className="material-icons left">keyboard_arrow_left</i>Retour</Link>
                <div className="row m3">
                    <div className="col s3"></div>
                    <form className="col s6 z-depth-3" style={{paddingLeft:'45px'}}>
                    <h4 className="center" style={{paddingRight:'45px'}}>Inscription</h4>
                    <div className="row">
                        <div className="input-field col s10">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="icon_prefix" type="email" className="validate" onChange={(e) => {this.getEmail(e)}}/>
                            <label htmlFor="icon_prefix">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s10">
                            <i className="material-icons prefix">lock</i>
                            <input id="icon_telephone" type="password" className="validate" onChange={(e) => {this.getPassword(e)}}/>
                            <label htmlFor="icon_telephone">Mot de passe</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s10">
                            <label style={{marginLeft: "8px"}}>
                                <input type="checkbox" className="filled-in" onChange={(e) => {this.role(e) }}/>
                                <span>Administrateur</span>
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            
                        </div>
                        <div className="col s6">
                            <button className="waves-effect waves-light btn green" onClick={(e) => {this.addUser(e)}}><i className="material-icons left">check</i>Valider</button>
                        </div>
                    </div>
                    </form>
                    <div className="col s3"></div>
                </div>
            </div>
        )
    }

}

export default Inscription