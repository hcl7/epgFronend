import React from 'react';

import SmartList from '../Components/SmartList';


class Home extends React.Component{

    state = {
        id: {},
        image: {},
        data: [],
        epgs: [
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

    render(){
        return(
            <div className="container-fluid">
                <React.StrictMode>
                    <SmartList 
                        //smartListHeaders={slShort_event_descriptor}
                        actionLabel={'Details'}
                        action={'navlink'}
                        view={'/details'}
                        where="name"
                        //content={this.state.image}
                        clicked={this.onClickedHandle}
                    />
                </React.StrictMode>
            </div>
        );
    }
}

export default Home;