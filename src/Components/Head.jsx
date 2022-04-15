import React from 'react';
import {Config} from '../Config/Config';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions';
import { connect } from 'react-redux';

class Head extends React.Component{

    componentDidMount(){
        //this.props.onAuthCheck();
    }
    render(){
        //console.log('isAuthenticated: ', this.props.isAuthenticated);
        return(
            <nav className="navbar container navbar-expand-lg py-3" style={Config.container.style}>
                <div className="container">
                    <NavLink to={'/'}><img src={Config.logo.img} style={Config.logo.style} alt={Config.logo.alt} className='navbar-brand d-inline-block align-middle mr-2' /></NavLink>
                    <span className="text-white"></span>
                    <div id="navbarSupportedContent" className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><NavLink to={'/'} className='nav-link text-white'>{'Home'}</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null,
        loading: state.loading,
        error: state.error,
        authRedirectPath: state.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
      //onAuthCheck: () => dispatch(actions.authCheckState())
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Head);