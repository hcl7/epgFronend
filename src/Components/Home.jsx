import React from 'react';
import {slShort_event_descriptor,sleep} from '../Config/RouterConfig';
import SmartList from '../Components/SmartList';
import XMLParser from 'react-xml-parser';
import axios from '../Config/axios-baseUrl';
import Input from '../Components/Input';
import Spinner from '../Helper/Spinner';

let epgs = [];
let channels = [
    {id: 1, title: 'HITS'},
    {id: 2, title: 'ACTION'}
];

class Home extends React.Component{

    state = {
        id: {},
        image: {},
        data: [],
        epg: [],
        fileContent: '',
        loading: true
    }

    componentDidMount() {
        axios.get('/tvaepg/view', {
            "Content-Type": "application/xml; charset=utf-8"
         }).then(res => {
            this.setState({ 
                epg: res.data,
                loading: false
            });
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

        let headers = {'Content-Type': 'multipart/form-data' };
        epgs && Array.isArray(epgs) && epgs.forEach((e) =>{
            const fdata = new FormData();
            fdata.append('eid', e.evn.id);
            fdata.append('starttime', e.evn.start_time);
            fdata.append('duration', e.evn.duration);
            fdata.append('CdNibble1', e.content_descriptor.nibble1);
            fdata.append('CdNibble2', e.content_descriptor.nibble2);
            fdata.append('PrdCountryCode', e.parental_rating_descriptor.country_code);
            fdata.append('PrdValue', e.parental_rating_descriptor.value);
            fdata.append('SedNameAlb', e.short_event_descriptor[0]['name']);
            fdata.append('SedLangAlb', 'Alb');
            fdata.append('SedNameEng', e.short_event_descriptor[1]['name']);
            fdata.append('SedLangEng', 'Eng');
            fdata.append('EedTextAlb', e.extended_event_descriptor[0].text);
            fdata.append('EedLangAlb', 'Alb');
            fdata.append('EedTextEng', e.extended_event_descriptor[1].text);
            fdata.append('EedLangEng', 'Eng');
            fdata.append('Channel', this.state.channel);
            fdata.append('Status', 1);
            axios.post('/tvaepg/insert/', fdata, headers)
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
                value.push(channels[i]);
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
            <div className="container">
                <React.StrictMode>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                <input className="file-upload" type="file" name="file"  data-icon="false" onChange={this.onFileChange} />
                            </div>
                            <div className="col-sm">
                                <Input
                                    elementType={'button'}
                                    class='btn btn-outline-info'
                                    id={'cd'}
                                    value={'Insert'}
                                    clicked={this.insertHandler.bind(this)}
                                />
                            </div>
                            <div className="col">
                                <Input
                                    elementType={'select'}
                                    id={'channel'}
                                    optitle={'title'}
                                    options={channels}
                                    changed={this.onChangedSelectedChannel}
                                />
                            </div>
                        </div>
                    </div>
                    {smartlist}
                </React.StrictMode>
            </div>
        );
    }
}

export default Home;