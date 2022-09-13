import React from 'react';
import {slShort_event_descriptor,sleep} from '../Config/RouterConfig';
import SmartList from '../Components/SmartList';
import XMLParser from 'react-xml-parser';
import axios from '../Config/axios-baseUrl';
import Input from '../Components/Input';
import Spinner from '../Helper/Spinner';

let epgs = [];

class Home extends React.Component {

    state = {
        id: {},
        image: {},
        data: [],
        epg: [],
        channels: [],
        fileContent: '',
        loading: true
    }

    componentDidMount() {
        this.getEpgs();
        this.getChannels();
    }

    getEpgs = () =>{
        var config = {
            method: 'get',
            url: '/tvaepg/view',
            headers: { 
                'ApiKey': 'JeZAmgId4jLDHT3ipaf7uT0P'
            },
            "Content-Type": "application/xml; charset=utf-8"
        };
        axios(config).then(res => {
            this.setState({
                epg: res.data,
                loading: false
            });
        });
        console.log('getEpgs: ', this.state.epg);
    }

    getChannels = () =>{
        var config = {
            method: 'get',
            url: '/channels/view',
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
                    title: channel,
                });
            });
            this.setState({
                channels: channels,
                loading: false
            });
            console.log('channels: ',this.state.channels);
        });
    }

    getEvents(){
        const event = [];
        this.state.data.map((e) => (
            event.push({
                id: e.attributes.id, 
                start_time: e.attributes.start_time,
                duration: e.attributes.duration
            })
        ));
        return event;
    }

    get_short_event_descriptor(){
        const short_event_descriptor = [];
        this.state.data.map((e) => (
            e.children.forEach((c) =>{
                if(c.attributes.name !== undefined){
                    short_event_descriptor.push({
                        lang: c.attributes.lang,
                        name: c.attributes.name
                    })
                }
            })
        ));
        return short_event_descriptor;
    }

    get_extended_event_descriptor(){
        const extended_event_descriptor = [];
        this.state.data.map((e) => (
            e.children.forEach((c) =>{
                c.children.forEach((d) =>{
                    if(d.value !== undefined){
                        extended_event_descriptor.push({
                            lang: c.attributes.lang,
                            text: d.value
                        });
                    }
                });
            })
        ));
        return extended_event_descriptor;
    }

    get_content_descriptor(){
        const content_descriptor = [];
        this.state.data.map((e) => (
            e.children.forEach((c) =>{
                if(c.attributes.nibble1 !== undefined && c.attributes.nibble2 !== undefined){
                    content_descriptor.push({
                        nibble1: c.attributes.nibble1,
                        nibble2: c.attributes.nibble2
                    })
                }
            })
        ));
        return content_descriptor;
    }

    get_parental_rating_descriptor(){
        const parental_rating_descriptor = [];
        this.state.data.map((e) => (
            e.children.forEach((c) =>{
                if(c.attributes.country_code !== undefined){
                    parental_rating_descriptor.push({
                        country_code: c.attributes.country_code,
                        value: c.value
                    })
                }
            })
        ));
        return parental_rating_descriptor;
    }

    collectEpg(){
        const evn = this.getEvents();
        const short_event_descriptor = this.get_short_event_descriptor();
        const extended_event_descriptor = this.get_extended_event_descriptor();
        const content_descriptor = this.get_content_descriptor();
        const parental = this.get_parental_rating_descriptor();
        epgs = [];
        content_descriptor.map((cd, i) =>{
            return (
            epgs.push({
                evn:{
                    id: evn[i].id,
                    start_time: evn[i].start_time,
                    duration: evn[i].duration
                },
                short_event_descriptor:[
                    {
                        lang: short_event_descriptor[i+i].lang,
                        name: short_event_descriptor[i+i].name
                    },
                    {
                        lang: short_event_descriptor[i+i+1].lang,
                        name: short_event_descriptor[i+i+1].name
                    }
                ],
                extended_event_descriptor:[
                    {
                        lang: extended_event_descriptor[i+i].lang,
                        text: extended_event_descriptor[i+i].text
                    },
                    {
                        lang: extended_event_descriptor[i+i+1].lang,
                        text: extended_event_descriptor[i+i+1].text
                    }
                ],
                content_descriptor: {
                    nibble1: cd.nibble1, 
                    nibble2: cd.nibble2
                },
                parental_rating_descriptor:{
                    country_code: parental[i].country_code,
                    value: parental[i].value
                }
            }));
        });
    }   

    insertHandler = () =>{
        console.log('insertHandler!');

        const jsonXml = new XMLParser().parseFromString(this.state.fileContent);
        this.setState({ 
            data: jsonXml.getElementsByTagName('Event'), 
        });
        
        this.collectEpg();
        console.log('epgs: ', epgs);

        epgs && Array.isArray(epgs) && epgs.forEach((e) =>{
            const fdata = new FormData();
            fdata.append('eid', e.evn.id);
            fdata.append('starttime', e.evn.start_time);
            fdata.append('duration', e.evn.duration);
            fdata.append('CdNibble1', e.content_descriptor.nibble1);
            fdata.append('CdNibble2', e.content_descriptor.nibble2);
            fdata.append('PrdCountryCode', e.parental_rating_descriptor.country_code);
            fdata.append('Prd', e.parental_rating_descriptor.value);
            fdata.append('ShortAlb', e.short_event_descriptor[0]['name']);
            fdata.append('ShortEng', e.short_event_descriptor[1]['name']);
            fdata.append('ExtendedAlb', e.extended_event_descriptor[0].text);
            fdata.append('ExtendedEng', e.extended_event_descriptor[1].text);
            fdata.append('Channel', this.state.channel);
            fdata.append('Status', 1);

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
                    console.log(response);
                })
                .catch(function (error){
                    console.log(error);
                }
            );
            sleep(500);
        });
    }

    onFileChange = (event) => {
        event.preventDefault();
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            this.setState({fileContent: text});
        };
        reader.readAsText(event.target.files[0], 'ISO-8859-1');
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
        this.setState({ channel: value[0].title });
    }

    render(){
        let smartlist = null;
        if(this.state.loading){
            smartlist = (
                <Spinner />
            );
        } else {
            smartlist = <SmartList 
                smartListHeaders={slShort_event_descriptor}
                smartListContents={this.state.epg}
                actionLabel={'Details'}
                action={'navlink'}
                view={'/details'}
                where="id"
            />
        }
        return(
            <React.StrictMode>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2">
                            <Input elementType={'iLink'}
                                icon={'add'}
                                view={'add'}
                                where={'event'}
                            />
                        </div>
                        <div className="col-sm-8">
                            <Input
                                elementType={'textbutton'}
                                className={'btn btn-outline-info'}
                                labeled={'Search'}
                                type="button"
                                id={'searchEvent'}
                                
                            />
                        </div>
                        <div className="col-sm-2">
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
                {smartlist}
            </React.StrictMode>
        );
    }
}

export default Home;