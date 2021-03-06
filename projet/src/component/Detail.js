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
            comments: [],
            url: ''
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

        let responseComment = await CommentService.list(id); // Va chercher les données des commentaires
        if(responseComment.ok){
            let data = await responseComment.json();
            this.setState({comments: data.comments})
        }else{
            console.log(response.error);
        }

        Materialize.CharacterCounter.init(document.getElementById('commentaire')); // Compteur de caractère pour le commentaire
        this.setState({url: 'whatsapp://send?text='+window.location.href+''});
    }

    async changeRating( newRating, body) { // Change la note du film (étoiles)
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

    star(){ // Affichage des étoiles de notation
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

    getNewComment(e){ // Update le state si le commentaire n'est pas trop long
        if(e.target.value.length > 120){
            Materialize.toast({html: "<span><i class='material-icons left lime-text'>warning</i> Votre commentaire est trop long</span>"});
        }
        this.setState({
            newComment: e.target.value
        });
    }

    async sendComment(e){ // Crée un nouveau commentaire
        e.preventDefault();
        if(localStorage.isAuth === "true"){ // Si l'user est co
            if(this.state.newComment.length < 120){ // Si le commentaire n'est pas trop long
                let body = {
                    content: this.state.newComment,
                    date: new Date().toLocaleDateString('fr-Fr'),
                    filmId: this.state.film._id,
                    userId: JSON.parse(localStorage.idUser)
                }
                let response = await CommentService.create(body); // Crée un commentaire
                if(response.ok){
                    let data = await response.json();
                    this.setState({
                        ...this.state,
                        comments: data.comments})
                        document.getElementById('commentaire').value = '';
                        document.getElementById('commentaire').blur();
                        this.componentDidMount();
                }else{
                    console.log(response.error);
                }
            }else{
                Materialize.toast({html: "<span><i class='material-icons left lime-text'>warning</i> Votre commentaire est trop long</span>"});
            }
        }else{
            Materialize.toast({html: "<span>Vous devez être <a href='/connexion'>connecté</a> !</span>"});
        }
    }

    async deleteComment(e, id){ // Efface le commentaire
        e.preventDefault();
        let response = await CommentService.delete(id); // Supprimer un commentaire
        console.log(response);
            if(response.ok){
                Materialize.toast({html: "<span>Commentaire supprimé</span>"});
                this.componentDidMount();
            }else{
                console.log(response.error);
            }
    }

      render(){
          return(
              <div>
                    <Menu/>
                        <div className="container">
                        <br/>
                        <Link to={'/'} className="waves-effect waves-light btn"><i className="material-icons left">keyboard_arrow_left</i>Retour</Link>
                        <a className="white-text waves-effect waves-light btn right btn-floating z-depth-2" href={this.state.url} data-action="share/whatsapp/share"><img className="left" src="https://img.icons8.com/color/48/000000/whatsapp.png" alt="WhatsApp" style={{width: '30px', height: '30px', marginTop: '4px', marginLeft: '5px'}}/></a>
                            <div className="row">
                                <div className="col m6">
                                    <br/>
                                    <img src={this.state.film && this.state.film.img} alt=""/>
                                    <br/>
                                    {
                                        this.star()
                                    }
                                </div>
                                <div className="col m6">
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
                            <button className="btn-floating waves-light btn-large active" type="submit" name="action" onClick={(e) => {this.sendComment(e)}}><i className="material-icons">send</i></button>
                        </div>
                        <div className="row">
                            <ul className="collection">
                                {
                                    this.state.comments ?
                                    this.state.comments.map((comment, c = 0) => {
                                        c++;
                                        return(
                                            <li className="collection-item avatar z-depth-2" key={c}>
                                                <img title={comment.userId} src="https://previews.123rf.com/images/asmati/asmati1602/asmati160203132/52184894-avatar-de-l-utilisateur-signe-anonimus-flat-ic%C3%B4ne-de-style-sur-fond-transparent.jpg" alt={comment.id} className="circle"/>
                                                <span className="title">{comment.date}</span>
                                                <p className="truncate">{comment.content}</p>
                                                {
                                                    localStorage.user_role === "1" ? <i id="close" className="secondary-content material-icons" onClick={(e) => { this.deleteComment(e, comment._id)}}>close</i> : null
                                                }
                                                
                                            </li>
                                        )
                                    }) : null

                                }
                            </ul>
                        </div>
                        <br/>
                        <Footer/>
              </div>
          )
      }


}

export default Detail;

