import React from 'react';
import { connect } from 'react-redux';
import {slShort_event_descriptor, TVepgExportHead, TVepgExportBody, TVAXMLFoot} from '../../Config/RouterConfig';
import SmartList from '../../Components/SmartList';
import axios from '../../Config/axios-baseUrl';
import Input from '../../Components/Input';
import Spinner from '../../Helper/Spinner';
import { XmlFileSaver } from '../../Config/XmlFileSaver';

class Export extends React.Component{

    state = {
        channels: [],
        loading: true,
        selectedChannel: ''
    }

    componentDidMount() {
        this.getChannels();
        this.getEpgs(this.state.selectedChannel);
    }

    getChannels = () =>{
        var config = {
            method: 'post',
            url: '/channels/view',
            headers: { 
                'ApiKey': this.props.apiKey
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
                selectedChannel: Object(channels[0]).title,
                loading: false
            });
        });
    }

    onChangedSelectedChannel = (e) =>{
        let options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(this.state.channels[i]);
            }
        }
        this.setState({ selectedChannel: value[0].title });
        this.getEpgs(value[0].title);
    }

    getEpgs = (channel) =>{
        var data = new FormData();
        data.append('channel', channel);
        var config = {
            method: 'post',
            url: '/tvaepg/listexport',
            headers: { 
                'ApiKey': this.props.apiKey
            },
            "Content-Type": "application/xml; charset=utf-8",
            data: data
        };
        axios(config).then(res => {
            this.setState({
                epg: res.data,
                loading: false
            });
        });
    }

    updateStatus = (channel) => {
        var data = new FormData();
        data.append('channel', channel);
        var config = {
            method: 'post',
            url: '/tvaepg/statusupdate',
            headers: { 
                'ApiKey': this.props.apiKey
            },
            "Content-Type": "application/xml; charset=utf-8",
            data: data
        };
        axios(config).then(res => {
            console.log(res.data);
        });
    }

    onExport = () =>{
        let TVEPG = TVepgExportHead(this.state.selectedChannel);
        this.state.epg && this.state.epg.map((e,i) =>{
            TVEPG += TVepgExportBody(
                i,
                e.startTime,
                e.duration,
                e.shortAlb,
                e.genre,
                e.shortEng,
                e.extendedAlb,
                e.extendedEng,
                e.cdNibble1,
                e.cdNibble2,
                e.rating
            );
        });
        TVEPG += TVAXMLFoot;
        XmlFileSaver(TVEPG, this.state.selectedChannel + '.xml');
        this.updateStatus(this.state.selectedChannel);
        console.log('exported');
    }

    render(){
        const xmlStyle = {
            height: '32px',
            width: '32px'
        }

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
                        <Input elementType={'button'}
                            class={"btn btn-outline-secondary"}
                            icon={'xml'}
                            styled={xmlStyle}
                            clicked={this.onExport}
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    authRedirectPath: state.auth.authRedirectPath,
    message: state.auth.message,
    apiKey: state.auth.apiKey
});

export default connect(mapStateToProps)(Export);