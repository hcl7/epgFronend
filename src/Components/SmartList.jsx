import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Input from '../Components/Input';
import XMLParser from 'react-xml-parser';
import axios from '../Config/axios-baseUrl';
import {slShort_event_descriptor} from '../Config/RouterConfig';
import {imdbApiBaseUrl} from '../Config/RouterConfig';

let epg = [];
let id = {};
let img = {};

class SmartList extends Component {
    constructor() {
        super();
        this.state = {
            id: {},
            image: {},
            data: [],
        }
        this.onChangeHandle = this.onChangeHandle.bind(this);
    }

    onChangeHandle = (evt, i) =>{
        this.setState({[`short${i}`]: evt.target.value });
        console.log("name: ", this.state);
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
            id[e] = res.data.results[0]['id'];
            img[e] = res.data.results[0].image;
            console.log("image onClick: ", img);
            this.setState({id: id});
            this.setState({image: img});
            console.log("state image: ", this.state.image);
            console.log("Id: ", this.state.id);
         });
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

    render() {
        this.collectEpg();
        
        return (
            <div className='container-fluid'>
                <table className="table table-bordered table-striped table-dark">
                    <thead>
                        <tr>
                            {slShort_event_descriptor && Array.isArray(slShort_event_descriptor) && slShort_event_descriptor.map(slh => (
                                <th className="th-sm" key={slh.key}>
                                    <div><i className="bi bi-chevron-compact-down"></i>
                                        {slh.label}
                                    </div>
                                </th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {epg && Array.isArray(epg) && epg.map((slc, index) =>
                            <tr key={index}>
                                {Object.keys(slc.short_event_descriptor[1]).map((key, i) => (
                                    slShort_event_descriptor.some(header => header.key === key) ? 
                                    <td key={i}>
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        labeled={'Id'}
                                                        changed={(e) => this.onChangeHandle(e)}
                                                        value={slc.evn.id}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        labeled={'Start Time'}
                                                        changed={(e) => this.onChangeHandle(e)}
                                                        value={slc.evn.start_time}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        labeled={'Duration'}
                                                        changed={(e) => this.onChangeHandle(e)}
                                                        value={slc.evn.duration}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        labeled={'Nibble one'}
                                                        changed={(e) => this.onChangeHandle(e)}
                                                        value={slc.content_descriptor.nibble1}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        labeled={'Nibble two'}
                                                        changed={(e) => this.onChangeHandle(e)}
                                                        value={slc.content_descriptor.nibble2}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        labeled={'Country code'}
                                                        changed={(e) => this.onChangeHandle(e)}
                                                        value={slc.parental_rating_descriptor.country_code}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        labeled={'Parental'}
                                                        changed={(e) => this.onChangeHandle(e)}
                                                        value={slc.parental_rating_descriptor.value}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        labeled={'Alb'}
                                                        changed={(e) => this.onChangeHandle(e)}
                                                        value={slc.short_event_descriptor[0].lang}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        labeled={'Short'}
                                                        changed={(e) => this.onChangeHandle(e)}
                                                        value={slc.short_event_descriptor[0][key]}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        labeled={'Eng'}
                                                        changed={(e) => this.onChangeHandle(e)}
                                                        value={slc.short_event_descriptor[1].lang}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        labeled={'Short'}
                                                        id={this.state.short+index} name={this.state.short+index}
                                                        changed={(e,i) => this.onChangeHandle(e, index)}
                                                        
                                                        value={slc.short_event_descriptor[1][key]}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        labeled={'Alb'}
                                                        changed={(e) => this.onChangeHandle(e)}
                                                        value={slc.extended_event_descriptor[0].lang}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        labeled={'Extended'}
                                                        changed={(e) => this.onChangeHandle(e)}
                                                        value={slc.extended_event_descriptor[0].text}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textlabel'}
                                                        labeled={'Eng'}
                                                        changed={(e) => this.onChangeHandle(e)}
                                                        value={slc.extended_event_descriptor[1].lang}
                                                    />
                                                </div>
                                                <div className="col-sm">
                                                    <Input
                                                        elementType={'textbutton'}
                                                        className={'btn btn-outline-info'}
                                                        labeled={'Extended'}
                                                        type="button"
                                                        id={'extened' + index}
                                                        name={'extened' + index}
                                                        clicked={(e) => this.onClickedHandle(slc.short_event_descriptor[1][this.props.where])}
                                                        value={slc.extended_event_descriptor[1].text || this.state.image[slc.short_event_descriptor[1][this.props.where]]}
                                                        changed={(e) => this.onChangeHandle(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td> : null
                                ))}
                                <td>
                                    {this.props.action === 'navlink'? 
                                    <NavLink className="btn btn-outline-info" to={this.props.view + '/' + slc.short_event_descriptor[1][this.props.where]}>{this.props.actionLabel}</NavLink>
                                    : this.props.action === 'button' ? 
                                    <button className="btn btn-outline-danger" onClick={(e) => this.onClickedHandle(slc[this.props.where])}>{this.props.actionLabel}</button>
                                    : null}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SmartList;