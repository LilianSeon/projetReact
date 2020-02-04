import React, {Component} from 'react';
import '../App'
import Menu from '../component/Menu';

class Home extends Component{

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
            </div>
        )
    }

}

export default Home;