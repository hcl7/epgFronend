import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../store/authSlice';

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }
    render() {
        console.log('[Logout]',this.props.authRedirectPath);
        return <Redirect to={this.props.authRedirectPath} />;
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    authRedirectPath: state.auth.authRedirectPath,
    message: state.auth.message
});


const mapDispatchToProps = { logout };

export default connect(mapStateToProps,mapDispatchToProps)(Logout);