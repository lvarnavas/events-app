import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
    const auth = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>ALL EVENTS</NavLink>
            </li>
            <li>
                <NavLink to="/search">SEARCH</NavLink>
            </li>
            {auth.isLoggedIn && (
                <li>
                    <NavLink to={`/user/${auth.userId}/`}>MY EVENTS</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/events/new">CREATE EVENT</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to={`/profile/${auth.userId}`}>PROFILE</NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/auth">AUTHENTICATE</NavLink>
                </li>
            )}

            {auth.isLoggedIn && (
                <li>
                    <button onClick={auth.logout}>LOG OUT</button>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;