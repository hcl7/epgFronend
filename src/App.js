import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Home from './Components/Home';
import EventDetails from './Components/Epg/EventDetails';
import AddEvent from './Components/Epg/AddEvent';
import { Route, Switch } from 'react-router-dom'
import Export from './Components/Epg/Export.jsx';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Layout from './hoc/Layout';
import {checkAuthState} from './store/authSlice';
import Signup from './Components/Signup';
import AcountVerification from './Components/AccountVerification';
import SplitImport from './Components/Epg/SplitImport';

class App extends Component {
  componentDidMount(){
    this.props.checkAuthState();
  }
  render(){
    let routes = null;
    console.log('[App] isAuthenticated: ', this.props.isAuthenticated);
    console.log('[App] authRedirectPath: ', this.props.authRedirectPath);
    if(!this.props.isAuthenticated){
      routes = (
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/accountverification' component={AcountVerification} />
      </Switch>
      )
    }
    else {
      routes = (
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/details/:name' component={EventDetails} />
          <Route path='/add/event' component={AddEvent} />
          <Route path='/export/' component={Export} />
          <Route path='/import/' component={SplitImport} />
          <Route path='/logout' component={Logout} />
        </Switch>
      )
    };

    return (
      <React.StrictMode>
        <div>
          <Layout>
            {routes}   
          </Layout>
        </div>
      </React.StrictMode>
    );
  } 
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = {checkAuthState};
export default connect(mapStateToProps, mapDispatchToProps)(App);