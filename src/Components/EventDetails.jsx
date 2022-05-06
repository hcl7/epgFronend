import React from 'react';
//import axios from 'axios';
import Input from '../Components/Input';
//import { imdbApiBaseUrl } from '../Config/RouterConfig';
//const imdbApiBaseUrl = 'https://imdb-api.com/en/API/SearchMovie/k_z9yeskhc/';

class EventDetails extends React.Component {

    state = {
        id: 0,
        start_time: '',
        duration: 0,
        image: ''
    }

    componentDidMount(){}

    onChangeHandle = (evt) =>{
        this.setState({[evt.target.name]: evt.target.value});
        console.log("evt: ", this.state);
    }

    onExtenedClicked = () => {

    }

    onPosterClicked = (e) => {
        console.log("onPosterClicked: ", e.target.id);
        // axios.get(imdbApiBaseUrl + e)
        // .then(res => {
        //     id[e] = res.data.results[0]['id'];
        //     img[e] = res.data.results[0].image;
        //     console.log("image onClick: ", img);
        //     this.setState({id: id});
        //     this.setState({image: img});
        //     console.log("state image: ", this.state.image);
        //     console.log("Id: ", this.state.id);
        //  });
    }

    onTrailerClicked = () =>{

    }

    render(){
        return(
            <div className="container bg-dark">
                <div className="row">
                    <div className="col-sm">
                        <Input
                            elementType={'textlabel'}
                            labeled={'Id'}
                            name={'id'}
                            changed={this.onChangeHandle}
                            value={this.state.id}
                        />
                    </div>
                    <div className="col-sm">
                        <Input
                            elementType={'textlabel'}
                            labeled={'Start Time'}
                            name={'start_time'}
                            changed={this.onChangeHandle}
                            value={this.state.start_time}
                        />
                    </div>
                    <div className="col-sm">
                        <Input
                            elementType={'textlabel'}
                            labeled={'Duration'}
                            name={'duration'}
                            changed={this.onChangeHandle}
                            value={this.state.duration}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <Input
                            elementType={'textlabel'}
                            labeled={'Nibble one'}
                            name={'nibble1'}
                            changed={this.onChangeHandle}
                            value={this.state.nibble1}
                        />
                    </div>
                    <div className="col-sm">
                        <Input
                            elementType={'textlabel'}
                            labeled={'Nibble two'}
                            name={'nibble2'}
                            changed={this.onChangeHandle}
                            value={this.state.nibble2}
                        />
                    </div>
                    <div className="col-sm">
                        <Input
                            elementType={'textlabel'}
                            labeled={'Country code'}
                            name={'country_code'}
                            changed={this.onChangeHandle}
                            value={this.state.country_code}
                        />
                    </div>
                    <div className="col-sm">
                        <Input
                            elementType={'textlabel'}
                            labeled={'Parental'}
                            name={'parental'}
                            changed={this.onChangeHandle}
                            value={this.state.value}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <Input
                            elementType={'textlabel'}
                            labeled={'Short Alb'}
                            name={'shortAlb'}
                            changed={this.onChangeHandle}
                            value={this.state.shortAlb}
                        />
                    </div>
                    <div className="col-sm">
                        <Input
                            elementType={'textlabel'}
                            labeled={'Short Eng'}
                            name={'shortEng'}
                            changed={this.onChangeHandle}                           
                            value={this.state.shortEng}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <Input
                            elementType={'textlabel'}
                            labeled={'Extended Alb'}
                            name={'extendedAlb'}
                            changed={(e) => this.onChangeHandle(e)}
                            value={this.state.extendedAlb}
                        />
                    </div>
                    <div className="col-sm">
                        <Input
                            elementType={'textbutton'}
                            className={'btn btn-outline-info'}
                            labeled={'Extended Eng'}
                            type="button"
                            name={'extenedEng'}
                            clicked={this.onExtenedClicked}
                            value={this.state.extenedEng}
                            changed={this.onChangeHandle}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <Input
                            elementType={'textbutton'}
                            className={'btn btn-outline-info'}
                            labeled={'Poster'}
                            type="button"
                            id={'poster'}
                            name={'poster'}
                            clicked={this.onPosterClicked}
                            value={this.state.poster}
                            changed={this.onChangeHandle}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <Input
                            elementType={'textbutton'}
                            labeled={'Trailer'}
                            name={'trailer'}
                            changed={this.onChangeHandle}
                            value={this.state.trailer}
                            clicked={this.onTrailerClicked}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default EventDetails;