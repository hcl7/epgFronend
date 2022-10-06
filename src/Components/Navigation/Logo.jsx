import React from 'react';
import {Config} from '../../Config/Config'
import { NavLink } from 'react-router-dom';

const logo = (props) => (
    <NavLink to={'/'}><img src={Config.logo.img} style={Config.logo.style} alt={Config.logo.alt} className='navbar-brand d-inline-block align-middle mr-2' /></NavLink>
);

export default logo;
