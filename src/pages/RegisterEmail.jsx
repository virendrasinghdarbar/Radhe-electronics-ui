import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterEmail.css";
import axios from "axios";

function RegisterEmail() {

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const sendOtp = async () => {

        if (!email) {
            alert("Please enter email");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.post("/auth/send-otp",
                {
                    email: email
                }
            );

            alert(response.data.message || "OTP sent successfully");

            setOtpSent(true);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to send OTP"
            );

        } finally {

            setLoading(false);

        }
    };


    const verifyOtp = async () => {

        if (!otp) {
            alert("Please enter OTP");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.post("/auth/verify-otp",
                {
                    email: email,
                    otp: otp
                }
            );

            alert(response.data.message || "OTP verified");

            // Store verified email temporarily
            sessionStorage.setItem("verifiedEmail", email);

            // Go to complete registration
            navigate("/register");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Invalid OTP"
            );

        } finally {

            setLoading(false);

        }
    };


    return (
		<div className="register-page">

		    <div className="register-card">

		        <h2>Create Account</h2>

		        <p className="register-description">
		            Verify your email to continue registration
		        </p>

		        <label>Email Address</label>

		        <input
		            type="email"
		            placeholder="Enter your Gmail address"
		            value={email}
		            onChange={(e) => setEmail(e.target.value)}
		            disabled={otpSent}
		        />

		        {!otpSent && (
		            <button
		                onClick={sendOtp}
		                disabled={loading}
		            >
		                {loading ? "Sending OTP..." : "Send OTP"}
		            </button>
		        )}

		        {otpSent && (
		            <div className="otp-section">

		                <p className="otp-title">
		                    OTP has been sent to your email
		                </p>

		                <label>Enter OTP</label>

		                <input
		                    className="otp-input"
		                    type="text"
		                    placeholder="••••••"
		                    value={otp}
		                    onChange={(e) => setOtp(e.target.value)}
		                    maxLength="6"
		                />

		                <button
		                    onClick={verifyOtp}
		                    disabled={loading}
		                >
		                    {loading ? "Verifying..." : "Verify OTP"}
		                </button>

		                <button
		                    className="change-email-btn"
		                    onClick={() => {
		                        setOtpSent(false);
		                        setOtp("");
		                    }}
		                >
		                    Change Email
		                </button>

		            </div>
		        )}

		    </div>

		</div>
    );
}

export default RegisterEmail;


