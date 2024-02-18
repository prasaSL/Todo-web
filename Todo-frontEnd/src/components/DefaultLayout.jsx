import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "./ContextProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Todolist.css";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const { user, token ,setUser,setToken} = useStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }

    const logOut = (e) => {
        e.preventDefault();

         axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })

    };
    return (
        <>
            <div id="body">
                <nav className="navbar  bg-body-tertiary" id="nav">
                    <div className="container-fluid">
                        <div
                            className=" navbar-collapse "
                            id="navbarNav"
                        >
                            <div className="dropdown" id="userAcc">
                                <button
                                    className="btn btn-secondary "
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {user.name} &nbsp; &nbsp;
                                </button>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={logOut}
                                        >
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>

                <Outlet />
            </div>
        </>
    );
}
