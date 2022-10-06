import React from 'react';
import {Config} from '../Config/Config';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

class Head extends React.Component{

    componentDidMount(){
        this.props.onAuthCheck();
        this.props.onSetAuthRedirectPath('/');
    }
    render(){
        let authRedirect = null;
        if (this.props.isAuthenticated){
            authRedirect = <Redirect to={'/'} />
        }
        else{
            authRedirect = <Redirect to='/login' />
        }
        console.log('Head isAuthenticated: ', this.props.isAuthenticated);
        console.log('Head authRedirectPath: ', this.props.authRedirectPath);
        return(
            <nav className="navbar container-fluid navbar-expand-lg py-3" style={Config.container.style}>
                <div className="container-fluid">
                    <NavLink to={'/'}><img src={Config.logo.img} style={Config.logo.style} alt={Config.logo.alt} className='navbar-brand d-inline-block align-middle mr-2' /></NavLink>
                    <div className="collapse navbar-collapse">
                        {this.props.isAuthenticated ? 
                        <ul className="navbar-nav">
                            <li className="nav-item"><NavLink to={'/'} className='nav-link text-white'>{'Home'}</NavLink></li>
                            <li className="nav-item"><NavLink to={'/export/'} className='nav-link text-white'>{'Export'}</NavLink></li>
                            <li className="nav-item"><NavLink to={'/logout'} className='nav-link text-white'>{'Logout'}</NavLink></li>
                        </ul> :
                        <ul className="navbar-nav">
                            <li className="nav-item"><NavLink to={'/login'} className='nav-link text-white'>{'Logout'}</NavLink></li>
                        </ul>
                        }
                    </div>
                </div>
                {authRedirect}
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
        onAuthCheck: () => dispatch(actions.authCheckState()),
        onSetAuthRedirectPath: (path) => dispatch(actions.onAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Head);