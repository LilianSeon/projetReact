import React, {Component} from 'react';
import '../App.css'
import Menu from '../component/Menu';
import FilmService from '../service/film.service';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

class Detail extends Component{

    constructor(props) {
        super(props);
        this.state = {
            film: {
                note: 0
            }
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
        console.log(this.props.location.state);
        this.setState({
            ...this.state,
            id: this.props.location.state.id,
            isAuth: this.props.location.state.isAuth,
            user_role: this.props.location.state.user_role
        })
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
        if(this.props.location.state.isAuth){
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

      render(){
          return(
              <div>
                    <Menu isAdmin={this.state.user_role}/>
                        <div className="container">
                        <br/>
                        <Link to={{
                                    pathname:'/',
                                    state:{
                                        id: this.state.id,
                                        isAuth: this.state.isAuth,
                                        user_role: this.state.user_role
                                    }
                                }} 
                                className="waves-effect waves-light btn"><i className="material-icons left">keyboard_arrow_left</i>Retour</Link>
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
              </div>
          )
      }


}

export default Detail;

