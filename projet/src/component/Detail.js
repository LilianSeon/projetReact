import React, {Component} from 'react';
import '../App.css'
import Menu from '../component/Menu';
import Footer from '../component/Footer';
import FilmService from '../service/film.service';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import Materialize from "materialize-css";
import CommentService from '../service/comment.service';


class Detail extends Component{

    constructor(props) {
        super(props);
        this.state = {
            film: {
                note: 0
            },
            newComment: '',
            comments: []
        };
    }

    async componentDidMount(){
        let url = window.location.href;
        let id = url.substring(url.lastIndexOf('/') + 1); // Prend la dernière valeur de l'url pour avoir l'id
        let response = await FilmService.detail(id); // Va chercher les données du film en fonction de l'id
        if(response.ok){
            let data = await response.json();
            this.setState({film: data.film})
        }else{
            console.log(response.error);
        }

        Materialize.CharacterCounter.init(document.getElementById('commentaire'));
        
    }

    async changeRating( newRating, body) {
        this.setState( prevState => ({
          film: {
              ...prevState.film, // Récup le state existant
              note: (this.state.film.note + newRating) / 2 // Fait la moyenne entre la note déjà existante et la note donné par l'user.
          }
        }));
        let response = await FilmService.update(this.state.film._id, this.state.film); // Update la note
        if(!response.ok){
            console.log(response.error);
        }
    }

    star(){
        if(localStorage.isAuth === "true"){
            return(
                <StarRatings
                    rating={this.state.film && this.state.film.note}
                    starRatedColor="#cddc39"
                    changeRating={this.changeRating.bind(this)}
                    numberOfStars={5}
                    name='rating'
                    starDimension="35px"
                    starSpacing="4px" 
                />
            )
        }
    }

    getNewComment(e){
        this.setState({
            newComment: e.target.value
        });
    }

    async sendComment(e){
        e.preventDefault();
        if(localStorage.isAuth === "true"){
            let body = {
                content: this.state.newComment,
                date: new Date().toLocaleDateString('fr-Fr'),
                filmId: this.state.film._id,
                userId: JSON.parse(localStorage.idUser)
            }
            console.log(body)
            let response = await CommentService.create(body); // Crée un commentaire
            console.log(response);
            if(response.ok){
                let data = await response.json();
                this.setState({comments: data.comments})
            }else{
                console.log(response.error);
            }

        }else{
            Materialize.toast({html: "<span>Vous devez être connecter !</span>"});
        }
    }

      render(){
          return(
              <div>
                    <Menu/>
                        <div className="container">
                        <br/>
                        <Link to={'/'} className="waves-effect waves-light btn"><i className="material-icons left">keyboard_arrow_left</i>Retour</Link>
                            <div className="row">
                                <div className="col s6">
                                    <br/>
                                    <img src={this.state.film && this.state.film.img} alt=""/>
                                    <br/>
                                    {
                                        this.star()
                                    }
                                </div>
                                <div className="col s6">
                                    <h3 className="center">{this.state.film && this.state.film.title}</h3><br/>
                                    <blockquote><p><span className="grey-text text-darken-1">Genre :</span> {this.state.film && this.state.film.genre}</p></blockquote>
                                    <blockquote><p><span className="grey-text text-darken-1">Date de sortie :</span> {this.state.film && this.state.film.date}</p></blockquote>
                                    <blockquote><p><span className="grey-text text-darken-1">Durée :</span> {this.state.film && this.state.film.duree}</p></blockquote>
                                </div>
                            </div>
                            <div className="row">
                                <div className="s12">
                                    <h4>Synopsis :</h4>
                                    <p>{this.state.film && this.state.film.content}</p>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <br/>
                        <div className="row">
                            <h5>Espace commentaire</h5>
                        </div>
                        <div className="row">
                            <div className="input-field col s10">
                                <i className="material-icons prefix">mode_edit</i>
                                <textarea id="commentaire" className="materialize-textarea" data-length="120" onChange={(e) =>{this.getNewComment(e)}}></textarea>
                                <label htmlFor="commentaire">Commentaire ...</label>
                            </div>
                            <button className="btn waves-effect waves-light" type="submit" name="action" onClick={(e) => {this.sendComment(e)}}>Envoyer
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                        <br/>
                        <Footer/>
              </div>
          )
      }


}

export default Detail;

