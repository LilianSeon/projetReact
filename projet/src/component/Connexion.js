import React, {Component} from 'react';
import Menu from '../component/Menu';

class Connexion extends Component{

    render(){
        return(
            <div>
                <Menu/>
                <br/> <br/> <br/> <br/>

                <div className="row m3">
                    <div className="col s3"></div>
                    <form className="col s6 z-depth-3" style={{paddingLeft:'45px'}}>
                    <div className="row">
                        <div className="input-field col s10">
                        <i className="material-icons prefix">account_circle</i>
                        <input id="icon_prefix" type="text" className="validate"/>
                        <label htmlFor="icon_prefix">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s10">
                        <i className="material-icons prefix">phone</i>
                        <input id="icon_telephone" type="tel" className="validate"/>
                        <label htmlFor="icon_telephone">Mot de passe</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            <a className="waves-effect waves-light btn lime"><i className="material-icons left">add_box</i>Inscription</a>
                        </div>
                        <div className="col s6">
                            <a className="waves-effect waves-light btn blue"><i className="material-icons left">check</i>Connexion</a>
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