import React, {Component} from 'react';
import Menu from '../component/Menu';
import { Link } from 'react-router-dom';
import Materialize from "materialize-css";
import FilmService from '../service/film.service';

class AjoutFilm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toLocaleDateString('fr-FR'),
            format: "mmmm dd, yyyy",
            formatMoment: "mmm dd, yyyy",
            title: "",
            genre: "",
            duree: "",
            content: "",
            note: "",
            img: ""
        };
    }
    
    componentDidMount() {
        var context = this;
    
        var elems = document.querySelectorAll(".dateset");
        Materialize.Datepicker.init(elems, { // Mise en place du date picker
          defaultDate: new Date(),
          format: this.state.format,
          container: "body",
          onSelect: function(date) {
            context.setState({ date: date.toLocaleDateString('fr-FR') });
            console.log(date); // Selected date is logged
          },
          autoClose: true
        });
    }

   async createFilm(e){
       e.preventDefault();
        let response = await FilmService.create(this.state); // crée un nouveau film
        if(response.ok){
            window.location.replace("/adminfilm");
        }else{
            console.log(response.error);
        }
    }


    render(){
        return(
            <div>
                <Menu/>
                <br/>
                <Link to={'/adminfilm'} className="waves-effect waves-light btn"><i className="material-icons left">keyboard_arrow_left</i>Retour</Link>
                <div className="row m3">
                    <div className="col s2"></div>
                    <form className="col s8 z-depth-3" style={{paddingLeft:'45px'}} onSubmit={(e) => this.createFilm(e)}>
                    <h4 className="center" style={{paddingRight:'45px'}}>Ajouter un film</h4>
                    <div className="row">
                        <div className="input-field col s10">
                            <i className="material-icons prefix">title</i>
                            <input id="title" type="text" className="validate" onChange={(event) => {this.setState({title: event.target.value})}}/>
                            <label htmlFor="title">Titre</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s10">
                            <i className="material-icons prefix">class</i>
                            <input id="genre" type="text" className="validate" onChange={(event) => {this.setState({genre: event.target.value})}}/>
                            <label htmlFor="genre">Genre</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s10">
                        <i className="material-icons prefix">date_range</i>
                        <input
                            id="date"
                            type="text"
                            className="datepicker dateset"
                            defaultValue={this.state.date}
                            onChange={(event) => {this.setState({date: event.target.value})}}
                        />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s10">
                            <i className="material-icons prefix">image</i>
                            <input id="image" type="text" className="validate" onChange={(event) => {this.setState({img: event.target.value})}}/>
                            <label htmlFor="image">Image URL</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s10">
                            <i className="material-icons prefix">rate_review</i>
                            <input id="note" type="number" max="5" min="0" step="0.1" className="validate" onChange={(event) => {this.setState({note: event.target.value})}}/>
                            <label htmlFor="note">Note</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s10">
                            <i className="material-icons prefix">access_time</i>
                            <input id="duree" type="text" className="validate" onChange={(event) => {this.setState({duree: event.target.value})}}/>
                            <label htmlFor="duree">Durée</label>
                        </div>
                    </div>  
                    <div className="row">
                        <div className="input-field col s10">
                            <i className="material-icons prefix">mode_edit</i>
                            <textarea id="icon_prefix2" className="materialize-textarea" onChange={(event) => {this.setState({content: event.target.value})}}></textarea>
                            <label htmlFor="icon_prefix2">Synopsis</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s7">
                            
                        </div>
                        <div className="col s4">
                            <button type="submit" className="waves-effect waves-light btn blue"><i className="material-icons left">send</i>Ajouter</button>
                        </div>
                    </div>
                    </form>
                    <div className="col s2"></div>
                </div>
            </div>
        )
    }

}

export default AjoutFilm