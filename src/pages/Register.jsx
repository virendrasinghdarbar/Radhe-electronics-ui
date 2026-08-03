import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [form, setForm] = useState({

        firstName: "",

        lastName: "",

        email: "",

        phone: "",

        password: "",

        confirmPassword: ""

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(form.password !== form.confirmPassword){

            alert("Password and Confirm Password do not match");

            return;

        }

        try{

            const request = {

                firstName: form.firstName,

                lastName: form.lastName,

                email: form.email,

                phone: form.phone,

                password: form.password

            };

            await api.post("/auth/register", request);

            alert("Registration Successful");

            navigate("/login");

        }catch(error){

            console.log(error);

            alert("Registration Failed");

        }

    };

    const googleRegister = () =>{

        alert("Google Registration Coming Soon");

    };

    return(

        <div className="auth-container">

            <div className="auth-card">

                <div className="left-panel">

                    <h2>Create Account</h2>

                    <p>

                        Register to shop electronics,
                        track your orders and enjoy
                        exciting offers.

                    </p>

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
                        width="170"
                        alt=""
                    />

                </div>

                <div className="right-panel">

                    <h3 className="mb-4">

                        Register

                    </h3>

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>First Name</label>

                                <input
                                    className="form-control"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Last Name</label>

                                <input
                                    className="form-control"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="mb-3">

                            <label>Email</label>

                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Mobile Number</label>

                            <input
                                className="form-control"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Password</label>

                            <div className="input-group">

                                <input
                                    className="form-control"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />

                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >

                                    {showPassword ? <FaEyeSlash/> : <FaEye/>}

                                </button>

                            </div>

                        </div>

                        <div className="mb-3">

                            <label>Confirm Password</label>

                            <div className="input-group">

                                <input
                                    className="form-control"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />

                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                >

                                    {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}

                                </button>

                            </div>

                        </div>

                        <button
                            className="btn-login"
                            type="submit"
                        >

                            Register

                        </button>

                    </form>

                    <hr/>

                    <button
                        className="google-btn"
                        onClick={googleRegister}
                    >

                        <FaGoogle
                            color="red"
                            size={20}
                        />

                        Continue with Google

                    </button>

                    <div className="bottom-text">

                        Already have an account?

                        <Link to="/login">

                            Login

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;