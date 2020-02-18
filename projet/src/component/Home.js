import React, {Component} from 'react';
import '../App.css'
import { Link } from 'react-router-dom';
import Menu from '../component/Menu';
import Footer from '../component/Footer';
import FilmService from '../service/film.service';
import Materialize from "materialize-css";

class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            film: [],
            auto: {}
        };
      }

    async componentDidMount(){
        let response = await FilmService.list(); // Va chercher les données de la liste des films
        if(response.ok){
            let data = await response.json();
            this.setState({
                film: data.film,
                auto: data.film
            })
            var dataFilm = {}; // Remplir un obj pour l'autocomplete
            for (var i = 0; i < this.state.film.length; i++) {
                dataFilm[this.state.film[i].title] = this.state.film[i].img;
            }
        }else{
            console.log(response.error);
            this.componentDidMount();
        }
        
        // Autocomplete options
        let elems = document.querySelectorAll('.autocomplete');
        Materialize.Autocomplete.init(elems, {
            data: dataFilm
        });
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
                    <div className="col s3"></div>
                    <div className="col s12 m6 search">
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">search</i>
                                <input type="text" id="autocomplete-input" className="autocomplete" onKeyUp={this.search}/>
                                <label htmlFor="autocomplete-input">Film...</label>
                            </div>
                        </div>
                    </div>
                    <div className="col s3"></div>
                </div>
                <div className="row" id="myUL">
                {
                    this.state.film.map((film) => {
                        return(
                            <div className="col s12 m6 l4 xl3 hit" key={film._id}>
                                <div className="card hoverable">
                                <div className="card-image">
                                    <img src={film.img} alt="" title={film.title}/>
                                    <span className="card-title title">{film.title}</span>
                                    <Link to={'/detail/'+film._id} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></Link>
                                </div>
                                <div className="card-content">
                                    <p className="trunc">{film.content}</p>
                                </div>
                                </div>
                            </div>
                        )    
                    })
                }
                </div>
                <br/>
                <Footer/>
            </div>
        )
    }

}

export default Home;