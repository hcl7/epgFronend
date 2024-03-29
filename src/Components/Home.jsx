import React from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../hoc/Auxiliary';
import {slShort_event_descriptor} from '../Config/RouterConfig';
import SmartList from '../Components/SmartList';
import axios from '../Config/axios-baseUrl';
import Input from '../Components/Input';
import Spinner from '../Helper/Spinner';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {

    state = {
        id: {},
        image: {},
        data: [],
        epg: [],
        channels: [],
        loading: true,
        selectedChannel: '',
        squery: ''
    }

    componentDidMount() {
        this.getChannels();
    }

    onChangeHandle = (evt) =>{
        this.setState({[evt.target.name]: evt.target.value});
    }

    getEpgs = (channel, query) =>{
        var data = new FormData();
        data.append('channel', channel);
        data.append('query', query);
        var config = {
            method: 'post',
            url: '/tvaepg/view',
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
        console.log("Channel Selected: ", value[0].title);
        this.setState({ selectedChannel: value[0].title });
    }

    onSearch = () =>{
        this.getEpgs(this.state.selectedChannel, this.state.squery);
    }

    render(){
        let redirect = null;
        if (!this.props.isAuthenticated){
            redirect =  (<Redirect to={this.props.authRedirectPath} />);
        }
        
        const styled = {
            paddingTop: 2,
            height: 32
        };
        
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
            <Auxiliary>
                {redirect}
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2">
                            <Input elementType={'iLink'}
                                icon={'add'}
                                view={'add'}
                                where={'event'}
                                styled={{height:34}}
                            />
                        </div>
                        <div className="col-sm-8">
                            <Input
                                styled={{height: 32}}
                                bstyled={styled}
                                elementType={'textbutton'}
                                className={'btn btn-outline-info'}
                                labeled={'Search'}
                                type="button"
                                name={'squery'}
                                value={this.state.squery}
                                changed={this.onChangeHandle}
                                clicked={this.onSearch}
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
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    authRedirectPath: state.auth.authRedirectPath,
    message: state.auth.message,
    apiKey: state.auth.apiKey
});

export default connect(mapStateToProps)(Home);