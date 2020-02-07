import React, {Component} from 'react';
import Menu from '../component/Menu';
import { Link } from 'react-router-dom';

class Connexion extends Component{

    render(){
        return(
            <div>
                <Menu/>
                <br/> <br/> <br/> <br/>

                <div className="row m3">
                    <div className="col s3"></div>
                    <form className="col s6 z-depth-3" style={{paddingLeft:'45px'}}>
                    <h4 className="center" style={{paddingRight:'45px'}}>Connexion</h4>
                    <div className="row">
                        <div className="input-field col s10">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="icon_prefix" type="email" className="validate"/>
                            <label htmlFor="icon_prefix">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s10">
                            <i className="material-icons prefix">lock</i>
                            <input id="icon_telephone" type="password" className="validate"/>
                            <label htmlFor="icon_telephone">Mot de passe</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            <Link className="waves-effect waves-light btn lime" to={'/inscription'}><i className="material-icons left">add_box</i>Inscription</Link>
                        </div>
                        <div className="col s6">
                            <button className="waves-effect waves-light btn blue"><i className="material-icons left">check</i>Connexion</button>
                        </div>
                    </div>
                    </form>
                    <div className="col s3"></div>
                </div>
            </div>
        )
    }

}

export default Connexion