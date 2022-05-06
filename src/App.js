import React, { Component } from 'react';
import Head from './Components/Head.jsx';
import './App.css';
import { connect } from 'react-redux';
//import * as actions from './store/actions';
import Home from './Components/Home';
import EventDetails from './Components/EventDetails';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {
  render(){
    return (
      <React.StrictMode>
      <Router>
        <Head />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/details/:name' component={EventDetails} />
        </Switch>
      </Router>
      </React.StrictMode>
    );
  } 
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //onAuthCheckState: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);