import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
    <div className="header">
        <div className="container">
            <div className="row">
                <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <a href="/">
                        <img src={require('../images/logo.png')}/>
                    </a>
                </div>

                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 hr">
                <NavLink to="/"
                    activeClassName = 'active'
                        >
                    Home
                </NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to ="/single-page">Project</NavLink>
                </div>
            </div>  
        </div>    
    </div>
);

export default Navbar;