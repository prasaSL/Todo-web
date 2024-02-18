import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "./ContextProvider";

export default function Signup() {
    const nameref = useRef();
    const emailref = useRef();
    const passwordref = useRef();
    const password1ref = useRef();
    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: nameref.current.value,
            email: emailref.current.value,
            password: passwordref.current.value,
            password_confirmation: password1ref.current.value,
        };

        axiosClient
            .post("signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };
    return (
        <div className="card align-self-center">
            <div className="form-control">
                <h1>sign up</h1>
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3 row">
                        <input
                            ref={nameref}
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                        />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3 row">
                        <input
                            ref={emailref}
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-floating mb-3 row">
                        <input
                            ref={passwordref}
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                        />
                        <label htmlFor="password">Password</label>
                    </div>

                    <div className="form-floating mb-3 row">
                        <input
                            ref={password1ref}
                            type="password"
                            name="password1"
                            id="password"
                            className="form-control"
                        />
                        <label htmlFor="password1">verify Password</label>
                    </div>
                    <div className="row form-group" id="btn">
                        <div className="col-auto">
                            <div className="col-auto">
                                <button
                                    className="btn btn-secondary"
                                    id="can"
                                    type="reset"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                        <div className="col-auto">
                            <button id="log" className="btn btn-primary">
                                Signup
                            </button>
                        </div>
                    </div>
                </form>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}
