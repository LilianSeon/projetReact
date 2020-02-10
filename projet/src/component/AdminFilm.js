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
            film: [],
            updateFilm: {
                title: '',
                date: ''
            },
            date: new Date().toLocaleDateString('fr-FR'),
            format: "mmmm dd, yyyy",
            title: "",
            genre: "",
            duree: "",
            content: "",
            note: "",
            img: ""
        };
        this.supprimer = this.supprimer.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }

    async componentDidMount(){
        let response = await FilmService.list(); // Va chercher les données de la liste des films
        if(response.ok){
            let data = await response.json();
            this.setState({film: data.film})
        }else{
            console.log(response.error);
        }

        var context = this;
    
        var elems = document.querySelectorAll(".dateset");
        Materialize.Datepicker.init(elems, { // Mise en place du date picker
          defaultDate: new Date(),
          format: this.state.format,
          container: "body",
          onSelect: (datee) => {
            context.setState({
                updateFilm:{
                    ...this.state.updateFilm,
                    date: datee.toLocaleDateString('fr-FR')
                }
            });
          },
          autoClose: true
        });

        Materialize.updateTextFields();

        // Offre la modal de confirmation de suprression
        let elem = document.querySelectorAll('.modal');
        Materialize.Modal.init(elem, {});
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

    async fillInput(id){
        let response = await FilmService.detail(id); // Va chercher les données du film en fonction de l'id
        if(response.ok){
            let data = await response.json();
            this.setState({updateFilm: data.film})
        }else{
            console.log(response.error);
        }
    }

    update(id){ // Change la valeur du boutton supprimer du modal pour modifier le bon film
        document.getElementById('update').value = id;
        let instance = Materialize.Modal.getInstance(document.getElementById('modal2')); // Open Modal
        instance.open();
        document.getElementById('titlelabel').classList.add('active');
        document.getElementById('genrelabel').classList.add('active');
        document.getElementById('imglabel').classList.add('active');
        document.getElementById('notelabel').classList.add('active');
        document.getElementById('dureelabel').classList.add('active');
        document.getElementById('contentlabel').classList.add('active');
    }

    handleUpdateForm = (e) => { // Update le state a chaque fois que l'utilisateur taper quelque chose
        const {id, value } = e.target;
        this.setState(previousState => {
            return {
                updateFilm:{
                    ...this.state.updateFilm,
                    [id]: value
                }
            }
        });
    }

    async sendUpdate(){
        let body = this.state.updateFilm;
        let id = document.getElementById('update').value;
        let response = await FilmService.update(id, body); // update les données du film en fonction de l'id
        if(response.ok){
            this.componentDidMount();
            
        }else{
            console.log(response.error);
        }
    }

    async delete(){
        let response = await FilmService.delete(document.getElementById('delete').value); // Supprime un film
        if(response.ok){
            this.componentDidMount();
        }else{
            console.log(response.error);
        }
    }

    render(){
        
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
                                    <tr className="hit" key={film._id || ''}>
                                        <td><img src={film.img || ''} alt="" width="80" height="110"/></td>
                                        <td className="title">{film.title || ''}</td>
                                        <td>{film.date || ''}</td>
                                        <td>{film.note || ''}</td>
                                        <td>
                                            <button className="waves-effect waves-light btn-small lime modal-trigger" style={{marginBottom: '15px'}} data-target="modal2" onClick={() => this.fillInput(film._id).then(() => this.update(film._id))}><i className="material-icons left">edit</i>Modifier</button><br/>
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
                            <button href="#!" className="modal-close btn waves-effect waves-light lime" type="submit" name="cancel" style={{marginRight: "15px"}}>
                                <i className="material-icons right">cancel</i>
                                    Annuler
                            </button>
                            <button href="#!" id="delete" className="modal-close btn waves-effect waves-light red" name="delete" onClick={() => this.delete()}>
                            <i className="material-icons right">check</i>
                                Supprimer
                            </button>
                        </div>
                    </div>
                    <div id="modal2" className="modal bottom-sheet">
                        <div className="modal-content">
                            <div className="row">
                                <h4>Modification : </h4>    
                            </div>
                            <div className="row">
                                <div className="input-field col s3">
                                    <i className="material-icons prefix">title</i>
                                    <input id="title" type="text" className="validate" onChange={this.handleUpdateForm} defaultValue={this.state.updateFilm.title || ''}/>
                                    <label id="titlelabel" htmlFor="title">Titre</label>
                                </div>
                                <div className="input-field col s3 offset-s1">
                                    <i className="material-icons prefix">class</i>
                                    <input id="genre" type="text" className="validate" onChange={this.handleUpdateForm} defaultValue={this.state.updateFilm.genre || ''}/>
                                    <label id="genrelabel" htmlFor="genre">Genre</label>
                                </div>
                                <div className="input-field col s3 offset-s1">
                                    <i className="material-icons prefix">date_range</i>
                                    <input
                                        id="date"
                                        type="text"
                                        className="datepicker dateset"
                                        defaultValue={this.state.updateFilm.date || ''}
                                    />
                                </div>
                                <div className="input-field col s3">
                                    <i className="material-icons prefix">image</i>
                                    <input id="img" type="text" className="validate" onChange={this.handleUpdateForm} defaultValue={this.state.updateFilm.img || ''}/>
                                    <label id="imglabel" htmlFor="image">Image URL</label>
                                </div>
                                <div className="input-field col s3 offset-s1">
                                    <i className="material-icons prefix">rate_review</i>
                                    <input id="note" type="number" max="5" min="0" step="0.1" className="validate" onChange={this.handleUpdateForm} defaultValue={this.state.updateFilm.note || ''}/>
                                    <label id="notelabel" htmlFor="note">Note</label>
                                </div>
                                <div className="input-field col s3 offset-s1">
                                    <i className="material-icons prefix">access_time</i>
                                    <input id="duree" type="text" className="validate" onChange={this.handleUpdateForm} defaultValue={this.state.updateFilm.duree || ''}/>
                                    <label id="dureelabel" htmlFor="duree">Durée</label>
                                </div>
                                <div className="input-field col s5">
                                    <i className="material-icons prefix">mode_edit</i>
                                    <textarea id="content" className="materialize-textarea" onChange={this.handleUpdateForm} defaultValue={this.state.updateFilm.content || ''}></textarea>
                                    <label id="contentlabel" htmlFor="content">Synopsis</label>
                                </div>    
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-close waves-effect waves-light btn red" style={{marginRight: "15px"}}><i className="material-icons left">cancel</i>Annuler</button>
                            <button id="update" className="modal-close waves-effect waves-light btn" onClick={this.sendUpdate.bind(this)}><i className="material-icons left">check</i>Modifier</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default AdminFilm;