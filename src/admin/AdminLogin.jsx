import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/Adminlogin.css";

function AdminLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
	const [role, setRole] = useState("");

    const loginAdmin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:8080/api/admin/login",
                {
                    email: email,
                    password: password,
					role: role
				
			    }
            );

            const data = response.data;

			console.log("Admin login response:", data);
			console.log("Role:", data.data.role.role);
			
           

        /*   localStorage.setItem(
                "Role",
               data.role
            );*/

            if (data.data.role.roleName === "ADMIN") {
				
				localStorage.setItem("token",data.token);
				
				localStorage.setItem("user", JSON.stringify({
					email: data.email,
					role: data.data.role.role
				}))
						   
                navigate("/admin/dashboard");

            } else {

                alert("You are not an admin");

                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }

        } catch (error) {

          //  console.error(error);

            alert(
                error.response?.data?.message ||
                "Invalid admin credentials"
            );
        }
    };

    return (
		<div className="admin-login-page">

		           <div className="admin-login-card">

		<div className="admin-icon">
		                    🛡️
		                </div>
		<h1>Admin Login</h1>

		<p className="admin-subtitle">
		    Sign in to manage your store
		</p>

            <form onSubmit={loginAdmin}>

			<div className="input-group">
			    <label>Admin Email</label>
                <input
                    type="email"
                    placeholder="Enter Admin Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />
				</div>

				<div className="input-group">
                       <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />
				</div>
				
				<div className="input-group">
				   <label>Role</label>
				<input
				                    type="role"
				                    placeholder="Role"
				                    value={role}
				                    onChange={(e) =>
				                        setRole(e.target.value)
				                    }
				                    required
				                />
								</div>

								<button
								                       type="submit"
								                       className="admin-login-btn"
								                   >
								                       Admin Login
								                   </button>

            </form>

        </div>
		
		</div>
    );
}

export default AdminLogin;