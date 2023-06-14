import React from 'react';
import Logo from '../Navigation/Logo';
import {Config} from '../../Config/Config';
import Items from '../Navigation/Items';

const toolbar = (props) => (
    <header className="navbar container shadow p-3 mb-5 bg-white rounded navbar-expand-lg py-3" style={Config.container.style}>
        <div className="container">
            <Logo />
            <Items isAuthenticated={props.isAuth} />
        </div>
    </header>
);

export default toolbar;