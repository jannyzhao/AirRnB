import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation() {
    const sessionUser = useSelector((state) => state.session.user);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <NavLink to="/signup"></NavLink>
            </>
        );
    }

    return (
        <nav className='navBar'>
            <NavLink exact to='/'>Home</NavLink>

            <div className='dropdown'>
                <button
                    className='dropdown-trigger'
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    Menu
                </button>

                <ul
                    className={`dropdown-menu${isDropdownOpen ? ' is-active' : ''}`}
                    onClick={() => setIsDropdownOpen(false)}
                >
                    <li>
                        <NavLink exact to='/'>
                            Home
                        </NavLink>
                    </li>
                    <li>{sessionLinks}</li>
                    <li>
                        <SignupFormModal />
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
