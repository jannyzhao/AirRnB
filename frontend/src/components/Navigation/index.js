import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import './Navigation.css';

function Navigation() {
    const dispatch = useDispatch();
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

    const demoLogin = (e) => {
        e.preventDefault();
        return dispatch(login({ email: 'demo@user.io', password: 'password' }))
    }
  
    return (
        <nav className='navBar'>
            <NavLink exact to='/'></NavLink>
            <div className='dropdown'>
                <button className='dropdown-trigger'
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >Menu
                </button>

                {/* <div className="searchBar">
                    <input type="text" placeholder="Search..." />
                </div> */}

                <ul
                    className={`dropdown-menu${isDropdownOpen ? ' is-active' : ''}`}
                    onClick={() => setIsDropdownOpen(false)}
                >
                        {/* <NavLink exact to='/'>
                            Home
                        </NavLink> */}
                    <li>
                    {sessionUser && <ProfileButton user={sessionUser} />}
                    { !sessionUser && <>
                <LoginFormModal />
                <NavLink to="/signup"></NavLink>
            </>
        }
                    </li>
                    <li>
                        <SignupFormModal />
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
