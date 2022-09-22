import React from 'react';
import {slShort_event_descriptor, TVepgExportHead, TVepgExportBody} from '../Config/RouterConfig';
import SmartList from '../Components/SmartList';
import axios from '../Config/axios-baseUrl';
import Input from '../Components/Input';
import Spinner from '../Helper/Spinner';

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
                'ApiKey': 'JeZAmgId4jLDHT3ipaf7uT0P'
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

    onExport = () =>{
        console.log('exported')
    }

    render(){
        console.log(TVepgExportHead(this.state.selectedChannel));
        console.log(this.state);
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
                            icon={'xml'}
                            styled={{height:32}}
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

export default Export;