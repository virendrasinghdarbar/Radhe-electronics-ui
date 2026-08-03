import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import authService from "../services/authService";
import {useAuth} from "../context/AuthContext";

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

		const response=await authService.login(

		form.email,

		form.password

		);

		auth.login(response.token);

		navigate("/dashboard");

		}catch(error){

		alert("Invalid Email or Password");

		}

		};

    const loginWithGoogle = () => {

        // We will integrate Google OAuth in Part 5
        alert("Google Login Coming Soon By DarbarTeam");

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

                    <button
                        className="google-btn"
                        onClick={loginWithGoogle}
                    >

                        <FaGoogle
                            color="red"
                            size={20}
                        />

                        {" "}Continue with Google

                    </button>

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





