import React from 'react';
import Logo from '../Navigation/Logo';
import {Config} from '../../Config/Config';
import Items from '../Navigation/Items';

const toolbar = (props) => (
    <header className="navbar container-fluid navbar-expand-lg py-3" style={Config.container.style}>
        <div className="container-fluid">
            <Logo />
            <Items isAuthenticated={props.isAuth} />
        </div>
    </header>
);

export default toolbar;