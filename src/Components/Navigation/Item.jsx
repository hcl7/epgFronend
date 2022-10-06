import React from 'react';
import { NavLink } from 'react-router-dom';

const item = (props) => (
    <li className="nav-item">
        <NavLink 
            className='nav-link text-white'
            to={props.link}
            exact={props.exact}>{props.children}</NavLink>
    </li>
);

export default item;