import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import authService from "../services/authService";
import {useAuth} from "../context/AuthContext";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
//import { useNavigate } from "react-router-dom";

function Login() {

    const [showPassword, setShowPassword] = useState(false);
	
	const auth=useAuth();
	const navigate=useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
        rememberMe: false
    });
	

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });

    };

	const handleSubmit=async(e)=>{

		e.preventDefault();


		try{
			const response = await authService.login(form);

			      localStorage.setItem("token", response.data.token); // or response.data.jwt

			      localStorage.setItem(
			          "user",
			          JSON.stringify({
			              name: response.data.username // or response.data.username
			          })
			      );

			      navigate("/");

			  } catch (error) {
			      alert("Invalid Email or Password");
			  }

		};

		
   
	

	const handleGoogleSuccess = async (credentialResponse) => {

	    try {

			const response = await axios.post(
			    "http://localhost:8080/api/auth/google",
			    {
			        token: credentialResponse.credential
			    }
			);

			localStorage.setItem("token", response.data.token); // or jwt

			localStorage.setItem(
			    "user",
			    JSON.stringify({
			        name: response.data.username // or username
			    })
			);

			navigate("/");

	    } catch (error) {

	        console.error(error);

	        alert("Google Login Failed");

	    }

	};

	
	

    return (

        <div className="auth-container">

            <div className="auth-card">

                <div className="left-panel">

                    <h2>Radhe Electronics Store</h2>

                    <p>
                        Login to access your cart,
                        orders, wishlist and exclusive
                        offers.
                    </p>

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
                        alt="shopping"
                        width="170"
                    />

                </div>

                <div className="right-panel">

                    <h3 className="mb-4">
                        Login
                    </h3>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>Email</label>

                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter Email"
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
                                    placeholder="Enter Password"
                                    required
                                />

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >

                                    {
                                        showPassword
                                            ? <FaEyeSlash />
                                            : <FaEye />
                                    }

                                </button>

                            </div>

                        </div>

                        <div className="d-flex justify-content-between mb-4">

                            <div>

                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={form.rememberMe}
                                    onChange={handleChange}
                                />

                                {" "}Remember Me

                            </div>

                            <a href="#">
                                Forgot Password?
                            </a>

                        </div>

                        <button
                            className="btn-login"
                            type="submit"
                        >
                            Login
                        </button>

                    </form>

                    <hr />

					<div className="d-flex justify-content-center mt-3">

					    <GoogleLogin
					        onSuccess={(credentialResponse) => {

					            console.log(credentialResponse);

					            console.log(jwtDecode(credentialResponse.credential));

					            handleGoogleSuccess(credentialResponse);

					        }}
					        onError={() => {

					            alert("Google Login Failed");

					        }}
					    />

					</div>
             
                    <div className="bottom-text">

                        Don't have an account?

                        <Link to="/register">
                            {" "}Register
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;





