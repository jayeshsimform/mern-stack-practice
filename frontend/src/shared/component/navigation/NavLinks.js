import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css'
const NavLinks = () => {
    const { isLoggedIn, logout, userId } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <ul className='nav-links'>
            <li>
                <NavLink to="/" >ALL USERS</NavLink>
            </li>

            {
                isLoggedIn && <li>
                    <NavLink to={`/${userId}/places`}>MY PLACES</NavLink>
                </li>
            }
            {
                isLoggedIn && <li>
                    <NavLink to="/place/new">ADD PLACES</NavLink>
                </li>
            }

            {
                !isLoggedIn &&
                <li>
                    <NavLink to="/auth">AUTHENTICATION</NavLink>
                </li>
            }

            {
                isLoggedIn &&
                <li>
                    <button onClick={() => { logout(); navigate('/auth') }}>Logout</button>
                </li>
            }

        </ul>
    );
}

export default NavLinks;