import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { createRef } from "react";

import { useState } from "react";
import { useStateContext } from "./ContextProvider.jsx";

export default function Login() {
    const emailRef = createRef();
    const passwordRef = createRef();
    const { setUser, setToken } = useStateContext();
    const [message, setMessage] = useState(null);

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setMessage(response.data.message);
                }
            });
    };

    return (
        <div className="align-self-center card">
            <div className="form-control">
                <form onSubmit={onSubmit}>
                    <div className="row align-center">
                        <h1 className="mx-auto">Login into your account</h1>

                        {message && (
                            <div className="alert">
                                <p>{message}</p>
                            </div>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            ref={emailRef}
                            type="email"
                            placeholder="Email"
                            id="email"
                            className="form-control"
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            className="form-control"
                            id="password"
                            ref={passwordRef}
                            type="password"
                            placeholder="Password"
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="row form-group" id="btn">
                        <div className="col-auto">
                            <div className="col-auto">
                                <button className="btn btn-secondary" id="can" type="reset">
                                    Cancel
                                </button>
                            </div>
                        </div>
                        <div className="col-auto">
                            <button id="log" className="btn btn-primary">Login</button>
                        </div>
                    </div>
                    <p className="message">
                        Not registered?{" "}
                        <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
