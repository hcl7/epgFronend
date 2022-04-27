import React from 'react';
import XMLParser from 'react-xml-parser';
import axios from '../Config/axios-baseUrl';
import {slShort_event_descriptor} from '../Config/RouterConfig';
import SmartList from '../Components/SmartList';
import {imdbApiBaseUrl} from '../Config/RouterConfig';

let epg = [
    // {
    //     evn:{
    //         id: 0,
    //         start_time: '',
    //         duration: 0
    //     },
    //     short_event_descriptor:{
    //         lang: '',
    //         name: ''
    //     },
    //     extended_event_descriptor:{
    //         lang: '',
    //         text: ''
    //     },
    //     content_descriptor:{
    //         nibble1: 1,
    //         nibble2: 0
    //     },
    //     parental_rating_descriptor:{
    //         country_code: '',
    //         value: 0
    //     }
    // }
]

class Home extends React.Component{

    state = {
        id: [],
        image: [],
        data: [],
        allEpg: [
            {
                evn:{
                    id: 0,
                    start_time: '',
                    duration: 0
                },
                short_event_descriptor:{
                    lang: '',
                    name: ''
                },
                extended_event_descriptor:{
                    lang: '',
                    text: ''
                },
                content_descriptor:{
                    nibble1: 1,
                    nibble2: 0
                },
                parental_rating_descriptor:{
                    country_code: '',
                    value: 0
                }
            }
        ]
    }

    componentDidMount() {
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
        console.log("clicked!", e);
        axios.get(imdbApiBaseUrl + e)
        .then(res => {
             this.setState({ 
                 id: [...this.state.id, res.data.results[0]['id']],
                 image: [...this.state.image,res.data.results[0].image]
             });
             console.log("ALL: ",res.data)
             console.log("Id: ",res.data.results[0].id);
         });
    }

    onChangeHandle = (evt) =>{
        console.log(evt);
    }

    render(){
        console.log("from state: ", this.state.id);
        const evn = this.getEvents();
        const short_event_descriptor = this.get_short_event_descriptor();
        const extended_event_descriptor = this.get_extended_event_descriptor();
        const content_descriptor = this.get_content_descriptor();
        const parental = this.get_parental_rating_descriptor();
        
        
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

        return(
            <div className="container">
                <SmartList 
                    smartListHeaders={slShort_event_descriptor}
                    smartListContents={epg}
                    actionLabel={'Details'}
                    action={'navlink'}
                    view={'/details'}
                    where="name"
                    content={this.state.image}
                    changed={this.onChangeHandle}
                    clicked={this.onClickedHandle}
                />
            </div>
        );
    }
}

export default Home;