import React from 'react';
import Input from '../Components/Input';
import axios from '../Config/axios-baseUrl';
import swal from 'sweetalert';

class AddEvent extends React.Component{
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
        pressed: true,
        channels: [],
        loading: false,
        selectedChannel: ''
    }

    componentDidMount(){
        this.getChannels();
    }

    onChangeHandle = (evt) =>{
        this.setState({[evt.target.name]: evt.target.value});
        console.log("evt: ", this.state);
    }

    onChangedSelectedChannel = (e) =>{
        let options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(this.state.channels[i]);
            }
        }
        console.log("Channel Selected: ", value[0].title);
        this.setState({ selectedChannel: value[0].title });
    }

    getChannels = () =>{
        var config = {
            method: 'post',
            url: '/channels/all',
            headers: { 
                'ApiKey': 'JeZAmgId4jLDHT3ipaf7uT0P'
            },
            "Content-Type": "application/xml; charset=utf-8"
        };
        
        axios(config).then(res => {
            let channels = [];
            res.data.forEach((channel, i) => {
                channels.push({
                    id: i, 
                    title: channel.channel,
                });
            });
            this.setState({
                channels: channels,
                selectedChannel: Object(channels[0]).title,
                loading: false
            });
        });
    }

    addEventHandler = () =>{
        swal({
            title: "Are you sure?",
            text: "New Event will be Added!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((Added) => {
            if (Added) {
                if (this.state.shortEng !== ''){
                    const fdata = new FormData();
                    fdata.append('eid', this.state.eid);
                    fdata.append('starttime', this.state.start_time);
                    fdata.append('duration', this.state.duration);
                    fdata.append('CdNibble1', this.state.nibble1);
                    fdata.append('CdNibble2', this.state.nibble2);
                    fdata.append('PrdCountryCode', this.state.country_code);
                    fdata.append('Prd', this.state.parental);
                    fdata.append('ShortAlb', this.state.shortAlb);
                    fdata.append('ShortEng', this.state.shortEng);
                    fdata.append('ExtendedAlb', this.state.extendedAlb);
                    fdata.append('ExtendedEng', this.state.extenedEng);
                    fdata.append('Channel', this.state.selectedChannel);
                    fdata.append('Status', 0);
        
                    var config = {
                        method: 'post',
                        url: '/tvaepg/insert',
                        data: fdata,
                        headers: { 
                            'ApiKey': 'JeZAmgId4jLDHT3ipaf7uT0P'
                        },
                        "Content-Type": "application/xml; charset=utf-8"
                    };
                    axios(config)
                        .then(function (response){
                            swal({
                                icon: "success",
                                text: response
                            });
                        })
                        .catch(function (error){
                            swal({
                                icon: "error",
                                text: error
                            });
                        }
                    );
                }
            }
            else {
                swal("Action Cancelled!", {
                    icon: "info"
                });
            }
        });

        
    }

    render(){
        return (
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
                            disabled={this.state.pressed || this.state.pressed}
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
                            disabled={this.state.pressed || this.state.pressed}
                            clicked={this.onTrailerClicked}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <Input
                            elementType={'button'}
                            class='btn btn-outline-info'
                            value={'Save'}
                            id={'save'}
                            clicked={this.addEventHandler}
                        />
                    </div>
                    <div className="col-sm">
                        <Input
                            elementType={'select'}
                            id={'channel'}
                            optitle={'title'}
                            options={this.state.channels}
                            changed={this.onChangedSelectedChannel}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default AddEvent;