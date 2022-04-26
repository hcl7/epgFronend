import React from 'react';
import axios from 'axios';
import { imdbApiBaseUrl } from '../Config/RouterConfig';
//const imdbApiBaseUrl = 'https://imdb-api.com/en/API/SearchMovie/k_z9yeskhc/';
class EventDetails extends React.Component{

    state = {
        id: 0,
        image: '',
    }
    componentDidMount(){
        axios.get(imdbApiBaseUrl + this.props.match.params.name)
        .then(res => {
             this.setState({ 
                 id: res.data.results[Object.keys(res.data.results)[0]].id,
                 image: res.data.results[Object.keys(res.data.results)[0]].image
             });
             console.log(res.data.results)
             console.log(res.data.results[Object.keys(res.data.results)[0]].id);
         });
         
    }
    render(){
        return(
            <div className="container">
                <input type="image" alt={'image from imdb'} src={this.state.image} />
            </div>
        );
    }
}

export default EventDetails;