import React, {Component} from 'react';
import '../App.css'
import { Link } from 'react-router-dom';
import Menu from '../component/Menu';
import FilmService from '../service/film.service';

class AdminFilm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            film: []
        };
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
                        <Link to={"/ajoutfilm"} class="waves-effect waves-light btn-small blue" style={{marginTop: '30px', marginLeft: '20px'}}><i class="material-icons left">add</i>Ajouter un film</Link>
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
                                            <a class="waves-effect waves-light btn-small lime" style={{marginBottom: '15px'}}><i class="material-icons left">edit</i>Modifier</a><br/>
                                            <a class="waves-effect waves-light btn-small red"><i class="material-icons left">delete</i>Supprimer</a>
                                        </td>
                                    </tr> 
                                )    
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default AdminFilm;