import React from 'react';
import {slShort_event_descriptor} from '../Config/RouterConfig';
import SmartList from '../Components/SmartList';
import XMLParser from 'react-xml-parser';
import axios from '../Config/axios-baseUrl';
//import {imdbApiBaseUrl} from '../Config/RouterConfig';
import Input from '../Components/Input';


let epg = [];

class Home extends React.Component{

    state = {
        id: {},
        image: {},
        data: [],
        epg: []
    }

    componentDidMount() {
        console.log('componentDidMount!');
        axios.get('/Hits.xml', {
           "Content-Type": "application/xml; charset=utf-8"
        }).then(res => {
            const jsonXml = new XMLParser().parseFromString(res.data);
            this.setState({ 
                data: jsonXml.getElementsByTagName('Event'), 
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

    onClickedHandle = (e) =>{
        
    }

    collectEpg(){
        const evn = this.getEvents();
        const short_event_descriptor = this.get_short_event_descriptor();
        const extended_event_descriptor = this.get_extended_event_descriptor();
        const content_descriptor = this.get_content_descriptor();
        const parental = this.get_parental_rating_descriptor();
        epg = [];
        content_descriptor.map((cd, i) =>{
            return (
            epg.push({
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
        let fdata = new FormData();
        epg && Array.isArray(epg) && epg.forEach((e, i) =>{
            fdata.append('eid', e.evn.id);
            fdata.append('start_time', e.evn.start_time);
            fdata.append('duration', e.evn.duration);
            fdata.append('cd_nibble1', e.content_descriptor.nibble1);
            fdata.append('cd_nibble2', e.content_descriptor.nibble2);
            fdata.append('prd_country_code', e.parental_rating_descriptor.country_code);
            fdata.append('prd_value', e.parental_rating_descriptor.value);
            fdata.append('sed_name_alb', e.short_event_descriptor[0]['name']);
            fdata.append('sed_lang_alb', 'Alb');
            fdata.append('sed_name_eng', e.short_event_descriptor[1]['name']);
            fdata.append('sed_lang_eng', 'Eng');
            fdata.append('eed_text_alb', e.extended_event_descriptor[0].text);
            fdata.append('eed_lang_alb', 'Alb');
            fdata.append('eed_text_eng', e.extended_event_descriptor[1].text);
            fdata.append('eed_lang_eng', 'Eng');
        });
        console.log("all: ", fdata.getAll('sed_name_alb'));
    }

    render(){
        this.collectEpg();
        console.log(epg);
        return(
            <div className="container">
                <React.StrictMode>
                    <div className="container">
                        <Input
                            elementType={'button'}
                            class='btn btn-outline-info'
                            id={'cd'}
                            value={'Insert'}
                            clicked={this.insertHandler}
                        />
                    </div>
                    <SmartList 
                        smartListHeaders={slShort_event_descriptor}
                        smartListContents={epg}
                        actionLabel={'Details'}
                        action={'navlink'}
                        view={'/details'}
                        where="name"
                    />
                </React.StrictMode>
            </div>
        );
    }
}

export default Home;