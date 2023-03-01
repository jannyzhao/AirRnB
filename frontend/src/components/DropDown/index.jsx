import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupForm from "../SignupModal/SignupForm";
import { Modal } from "../../context/Modal";
import "./Modal.css";
// import ScavengerHunt from "../ScavengerHunt";

export default function DropdownModal() {
    const [showDropdownModal, setShowDropdownModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    // const [showScavengerHuntModal, setShowScavengerHuntModal] = useState(false)

    const dispatch = useDispatch();

    const toggleDropdownModal = () => {
        setShowDropdownModal(!showDropdownModal);
    }

    const loginClick = () => {
        setShowDropdownModal(!showDropdownModal);
        setShowLoginModal(!showLoginModal);
    }

    const signupClick = () => {
        setShowDropdownModal(!showDropdownModal);
        setShowSignupModal(!showSignupModal);
    }

    const demoLogin = (e) => {
        e.preventDefault();
        return dispatch(login({ credential: `demo@user.io`, password: `password` }))
    }

    // const scavengerHuntClick = () => {
    //     setShowDropdownModal(!showDropdownModal);
    //     setShowScavengerHuntModal(!showScavengerHuntModal);
    // }

    return (
        <>
            <button onClick={toggleDropdownModal} className="btn-modal" id="profile-button-hamburger">
                <i className="fa-solid fa-bars" />
                <i className="fa-solid fa-user-circle" />
            </button>
            {/* shortcircuit conditional below that returns if true */}
            {showDropdownModal && (
                <div className="modal">
                    <div className="overlay" onClick={toggleDropdownModal}></div> {/* overlay is the rest of the document (of the viewport) */}
                    <div className="modal-content">
                        <ul>
                            <li className="bold dropdown-modal-content-item" onClick={loginClick}> Log In </li>
                            <li className="dropdown-modal-content-item" onClick={signupClick}> Sign Up </li>
                            <li className="dropdown-modal-content-item" id="demo-user" onClick={demoLogin}>Demo Login</li>
                            {/* <li> Feature Scavenger Hunt  </li> */}
                            {/* <li onClick={scavengerHuntClick}>Feature Scavenger Hunt</li> */}

                        </ul>
                    </div>
                </div>
            )}

            {/* Showing login form modal if its state is true */}
            {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <LoginForm />
                </Modal>
            )}

            {/* Showing signup form modal if its state is true */}
            {showSignupModal && (
                <Modal onClose={() => setShowSignupModal(false)}>
                    <SignupForm />
                </Modal>
            )}

            {/* Showing scavenger hunt modal if its state is true */}
            {/* {showScavengerHuntModal && (
                <Modal onClose={() => setShowScavengerHuntModal(false)}>
                    <ScavengerHunt />
                </Modal>
            )} */}
        </>
    );
}