import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/RegisterEmail.css";
function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "null");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">

                <Link className="navbar-brand fw-bold" to="/">
                    Radhe Electronics Store
                </Link>

                <form className="d-flex w-50">
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Search Products"
                    />
                </form>

                <div className="d-flex align-items-center">

                    {user ? (
                        <>
                            <Link
                                to="/"
                                className="nav-link text-white me-3"
                            >
                                Home
                            </Link>

                            <Link
                                to="/orders"
                                className="nav-link text-white me-3"
                            >
                                Orders
                            </Link>

                            <Link
                                to="/about"
                                className="nav-link text-white me-3"
                            >
                                About
                            </Link>

                            <span className="text-white me-3">
                                Welcome, <b>{user.name}</b>
                            </span>

                            <div className="dropdown me-3">
                                <button
                                    className="profile-btn dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                >
                                    <img
                                        src={user?.picture || "/userLogin.png"}
                                       className="profile-img"
                                    />
                                </button>

                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/profile"
                                        >
                                            My Profile
                                        </Link>
                                    </li>

                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={logout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="btn btn-light me-2"
                        >
                            <img
                                src="/userlogin.png"
                                width="25"
                                height="25"
                                alt="Login"
                            />
                        </Link>
                    )}

                    <button className="btn btn-warning">
                        🛒 Cart
                    </button>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;