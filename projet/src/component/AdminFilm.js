import React, {Component} from 'react';
import '../App.css'
import { Link } from 'react-router-dom';
import Menu from '../component/Menu';
import FilmService from '../service/film.service';
import Materialize from "materialize-css";

class AdminFilm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            film: []
        };
        this.supprimer = this.supprimer.bind(this);
        this.delete = this.delete.bind(this);
    }

    async componentDidMount(){
        let response = await FilmService.list(); // Va chercher les données de la liste des films
        if(response.ok){
            let data = await response.json();
            this.setState({film: data.film})
        }else{
            console.log(response.error);
        }
    }

    search() { // Recherche de film via l'input text
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("autocomplete-input");
        filter = input.value.toUpperCase();
        ul = document.getElementById("myUL");
        li = ul.getElementsByClassName("hit");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByClassName("title")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

    supprimer(id){ // Change la valeur du boutton supprimer du modal pour supprimer le bon film
        document.getElementById('delete').value = id;
    }

    async delete(){
        let response = await FilmService.delete(document.getElementById('delete').value); // Supprime un film
        if(response.ok){
            console.log("deleted");
            this.componentDidMount();
        }else{
            console.log(response.error);
        }
    }

    render(){
        // Offre la modal de confirmation de suprression
        let elems = document.querySelectorAll('.modal');
        Materialize.Modal.init(elems, {});
        return(
            <div>
                <Menu/>
                <div className="row">
                    <div className="col s3">
                        <h4>Côté Admin</h4>
                    </div>
                    <div className="col s6 search">
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">search</i>
                                <input type="text" id="autocomplete-input" className="autocomplete" onKeyUp={this.search}/>
                                <label htmlFor="autocomplete-input">Film...</label>
                            </div>
                        </div>
                    </div>
                    <div className="col s3">
                        <Link to={"/ajoutfilm"} className="waves-effect waves-light btn-small blue" style={{marginTop: '30px', marginLeft: '20px'}}><i className="material-icons left">add</i>Ajouter un film</Link>
                    </div>
                </div>
                <div className="row" id="myUL">
                    <table className="highlight">
                        <thead>
                        <tr>
                            <th>Affiche</th>
                            <th>Titre</th>
                            <th>Date</th>
                            <th>Note</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.film.map((film) => {
                                return(
                                    <tr className="hit" key={film._id}>
                                        <td><img src={film.img} alt="" width="80" height="110"/></td>
                                        <td className="title">{film.title}</td>
                                        <td>{film.date}</td>
                                        <td>{film.note}</td>
                                        <td>
                                            <button className="waves-effect waves-light btn-small lime" style={{marginBottom: '15px'}}><i className="material-icons left">edit</i>Modifier</button><br/>
                                            <button className="waves-effect waves-light btn-small red modal-trigger" data-target="modal1" onClick={() => this.supprimer(film._id)}><i className="material-icons left">delete</i>Supprimer</button>
                                        </td>
                                    </tr> 
                                )    
                            })
                        }
                        </tbody>
                    </table>
                    <div id="modal1" className="modal">
                        <div className="modal-content">
                            <h4>Supprimer</h4>
                            <p>Voulez-vous vraimlent supprimer cette élément ?</p>
                        </div>
                        <div className="modal-footer">
                            <button href="#!" className="modal-close btn waves-effect waves-light lime" type="submit" name="cancel"style={{marginRight: "15px"}}>
                                <i className="material-icons right">cancel</i>
                                    Annuler
                            </button>
                            <button href="#!" id="delete" className="modal-close btn waves-effect waves-light red" name="delete" onClick={() => this.delete()}>
                            <i className="material-icons right">check</i>
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default AdminFilm;