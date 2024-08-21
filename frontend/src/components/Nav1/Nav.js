import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    const isLoggedIn = !!localStorage.getItem('user');

    return (
        <div className="nav-signup-logo">
            <div className='nav-logo'>logo</div>
            {!isLoggedIn ? (
                <Link to="/login">
                    <button className='btn-login' id="nav-login-id">
                        Login
                    </button>
                </Link>
            ) : (
                <div className="nav-menu">
                    {/* Your main navbar items */}
                    <Link to="/navbar">Dashboard</Link>
                    {/* <Link to="/profile">Profile</Link> */}
                    <button onClick={() => localStorage.removeItem('user')}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default Nav;
