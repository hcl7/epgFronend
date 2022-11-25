import React from 'react';
import Item from '../Navigation/Item';

const items = (props) => (
    <ul className="navbar-nav">
        {props.isAuthenticated ?
            (<div className="collapse navbar-collapse">
                <Item link={'/'} exact>Home</Item>
                <Item link={'/export'}>Export</Item>
                <Item link={'/import'}>Import</Item>
                <Item link={'/logout'}>Logout</Item>
            </div>) : 
            (<div className="collapse navbar-collapse">
                <Item link={'/login'} exact>Login</Item>
                <Item link={'/signup'}>Signup</Item>
            </div>)
        }
    </ul>
);

export default items;