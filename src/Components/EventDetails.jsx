import React from 'react';
import axios from '../Config/axios-baseUrl';
import Input from '../Components/Input';
import ax from 'axios';
import { imdbApiBaseUrl, imdbApiTrailer, imdbApiWikipedia } from '../Config/RouterConfig';

class EventDetails extends React.Component {

    state = {
        eid: 0,
        start_time: '',
        duration: '',
        nibble1: '',
        nibble2: '',
        country_code: '',
        parental: '',
        shortAlb: '',
        shortEng: '',
        extendedAlb: '',
        extenedEng: '',
        poster: '',
        trailer: '',
    }

    componentDidMount(){
        const id = this.props.match.params.name
        axios.get('/tvaepg/detail/' + id)
        .then(res => {
            console.log(res.data);
            this.setState({
                eid: res.data[0].eid,
                start_time: res.data[0].startTime,
                nibble1: res.data[0].cdNibble1,
                nibble2: res.data[0].cdNibble2,
                duration: res.data[0].duration,
                country_code: res.data[0].prdCountryCode,
                parental: res.data[0].prdValue,
                shortAlb: res.data[0].sedNameAlb,
                shortEng: res.data[0].sedNameEng,
                extendedAlb: res.data[0].eedTextAlb,
                extenedEng: res.data[0].eedTextEng,
            });
        })
        .catch(function (){
            console.log("Check short Eng field!");
        });
    }

    onChangeHandle = (evt) =>{
        this.setState({[evt.target.name]: evt.target.value});
        console.log("evt: ", this.state);
    }

    onExtenedClicked = () => {
        let path = imdbApiWikipedia(this.state.id)
        ax.get(path)
        .then(res =>{
            this.setState({extenedEng: res.data.plot});
        })
        .catch(function (){
            console.log("Check short Eng field!");
        });
    }

    onPosterClicked = () => {
        let path = imdbApiBaseUrl + this.state.shortEng;
        console.log(path);
        ax.get(path)
        .then(res => {
            this.setState({
                poster: res.data.results[0].image,
                id: res.data.results[0]['id']
            });
        })
        .catch(function (){
            console.log("Check short Eng field!");
        });;
    }

    onTrailerClicked = () =>{
        let path = imdbApiTrailer + this.state.id;
        console.log(path);
        ax.get(path)
        .then(res =>{
            this.setState({trailer: res.data.linkEmbed});
            console.log(res.data.linkEmbed);
        })
        .catch(function (){
            console.log("Check short Eng field!");
        });;
    }

    onSubmit = () => {
        const id = this.props.match.params.name;
        console.log(this.state);
        let data = new FormData();
        data.append('id', id);
        data.append('eid', this.state.eid);
        data.append('starttime', this.state.start_time);
        data.append('duration', this.state.duration);
        data.append('CdNibble1', this.state.nibble1);
        data.append('CdNibble2', this.state.nibble2);
        data.append('PrdCountryCode', this.state.country_code);
        data.append('PrdValue', this.state.parental);
        data.append('SedNameAlb', this.state.shortAlb);
        data.append('SedLangAlb', 'Alb');
        data.append('SedNameEng', this.state.shortEng);
        data.append('SedLangEng', 'Eng');
        data.append('EedTextAlb', this.state.extendedAlb);
        data.append('EedLangAlb', 'Alb');
        data.append('EedTextEng', this.state.extenedEng);
        data.append('EedLangEng', 'Eng');

        axios.post('/tvaepg/update/' + id, data)
        .then(res =>{
            console.log(res.data);
        })
        .catch(function (error){
            console.log(error);
        });
    }

    render(){
        return(
            <div className="container bg-dark">
                <div className="row">
                    <div className="col-sm">
                        <Input
                            elementType={'textlabel'}
                            labeled={'Id'}
                            name={'eid'}
                            changed={this.onChangeHandle}
                            value={this.state.eid}
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
                            value={this.state.parental}
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
                            id={'extenedEng'}
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
                            id={'trailer'}
                            changed={this.onChangeHandle}
                            value={this.state.trailer}
                            clicked={this.onTrailerClicked}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <Input
                            elementType={'button'}
                            class='btn btn-outline-info'
                            value={'Update'}
                            id={'update'}
                            clicked={this.onSubmit}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default EventDetails;