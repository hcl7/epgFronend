import React from 'react';
import XMLParser from 'react-xml-parser';
import axios from '../Config/axios-baseUrl';
import {slShort_event_descriptor} from '../Config/RouterConfig';
import SmartList from '../Components/SmartList';
class Home extends React.Component{

    state = {
        data: [],
        event: {
            id: 0,
            start_time: '',
            duration: 0
        },
        short_event_descriptor: [{
            lang: '',
            name: ''
        }],
        extended_event_descriptor: [{
            lang: '',
            text: ''
        }],
        content_descriptor: [{
            nibble1: 1,
            nibble2: 0
        }],
        parental_rating_descriptor: [{
            country_code: '',
            value: 0
        }]
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

    render(){
        console.log('data: ',this.state.data);
        //console.log('events: ', this.getEvents());
        console.log('short_event_descriptor: ', this.get_short_event_descriptor());
        //console.log('get_extended_event_descriptor: ', this.get_extended_event_descriptor());
        //console.log('content_descriptor: ', this.get_content_descriptor());
        console.log("get_parental_rating_descriptor: ", this.get_parental_rating_descriptor());
        const content = this.get_short_event_descriptor();
        return(
            <div className="container">
                <SmartList 
                    smartListHeaders={slShort_event_descriptor}
                    smartListContents={content ? content : []}
                    actionLabel={'Details'}
                    action={'navlink'}
                    view={'/details'}
                    where="name"
                />
            </div>
        );
    }
}

export default Home;