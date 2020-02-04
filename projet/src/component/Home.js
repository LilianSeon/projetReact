import React, {Component} from 'react';
import '../App.css'
import Menu from '../component/Menu';
import FilmService from '../service/film.service';

class Home extends Component{

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

    render(){
        return(
            <div>
                <Menu/>
                <div className="row">
                    <div className="col s3"></div>
                    <div className="col s6 search">
                    <div className="row">
                        <div className="input-field col s12">
                        <i className="material-icons prefix">search</i>
                        <input type="text" id="autocomplete-input" className="autocomplete"/>
                        <label htmlFor="autocomplete-input">Film...</label>
                        </div>
                    </div>
                    </div>
                    <div className="col s3"></div>
                </div>
                <div className="row">
                {
                    this.state.film.map((film) => {
                        console.log(film);
                        return(
                            <div className="col s12 m4">
                                <div className="card hoverable">
                                <div className="card-image">
                                    <img src={film.img}/>
                                    <span className="card-title">{film.title}</span>
                                    <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
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
            </div>
        )
    }

}

export default Home;