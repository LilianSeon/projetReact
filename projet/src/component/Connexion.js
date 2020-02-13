import React, {Component} from 'react';
import Menu from '../component/Menu';
import Footer from '../component/Footer';
import { Link, Redirect } from 'react-router-dom';
import UserService from '../service/user.service';
import Materialize from "materialize-css";

class Connexion extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            user_role: 0,
            bddUser: {},
            id: '',
            isAuth: false
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

    async checkUser(e){ // Envoie de la requête pour ajouter un utilisateur en base de donnée
        e.preventDefault();
        let response = await UserService.list(); // Retourne la liste de tous les users
            if(response.ok){
                let data = await response.json();
                this.setState({bddUser: data});
                this.state.bddUser.users.map((user) => {
                    if(user.email === this.state.email){
                        if(user.password === this.state.password){
                            console.log("Connexion");
                            this.setState({
                                ...this.state,
                                id: user._id,
                                user_role: user.user_role,
                                isAuth: true
                            });
                            localStorage.setItem('idUser', JSON.stringify(user._id));
                            localStorage.setItem('user_role', JSON.stringify(user.user_role));
                            localStorage.setItem('isAuth', JSON.stringify(true));
                            localStorage.setItem('toast', JSON.stringify(true));

                            if(localStorage.user_role === "0"){
                                Materialize.toast({html: '<span>Vous êtes connecté !</span>'})
                            }

                            return true;
                        }else{
                            console.log("Mdp incorrect")
                            return false;
                        }
                    }else{
                        console.log("Utilisateur non inscrit")
                        return false;
                    }
                })
            }else{
                console.log(response.error);
            }
    }

    redirect(){
        if(this.state.isAuth){
            return(
                <Redirect to={'/'}/>
            )
        }
    }

    render(){
        return(
            <div>
                <Menu/>
                {this.redirect()}
                <br/> <br/> <br/>
                <div className="row m3">
                    <div className="col s3"></div>
                    <form className="col s6 z-depth-3" style={{paddingLeft:'45px'}}>
                    <h4 className="center" style={{paddingRight:'45px'}}>Connexion</h4>
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
                        <div className="col s6">
                            <Link className="waves-effect waves-light btn lime" to={'/inscription'}><i className="material-icons left">add_box</i>Inscription</Link>
                        </div>
                        <div className="col s6">
                            <button className="waves-effect waves-light btn blue" onClick={(e) => {this.checkUser(e)}}><i className="material-icons left">check</i>Connexion</button>
                        </div>
                    </div>
                    </form>
                    <div className="col s3"></div>
                </div>
                <br/>
                <br/>
                <Footer/>
            </div>
        )
    }

}

export default Connexion