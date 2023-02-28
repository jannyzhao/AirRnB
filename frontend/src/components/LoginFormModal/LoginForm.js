import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="login-container">
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <div className="login-username-email-container">
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                    placeholder="Username or Email"
                />
            </div>

            <label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                />
            </label>
            <button type="submit">Log In</button>
            </div>
        </form>
    );
}

export default LoginForm;