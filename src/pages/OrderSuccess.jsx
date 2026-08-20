import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "../styles/OrderSuccess.css";

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const paymentId = location.state?.paymentId;

    return (
        <div className="order-success-container">
            <div className="success-card">

                <FaCheckCircle className="success-icon" />

                <h1>Payment Successful!</h1>

                <p className="success-message">
                    Your order has been placed successfully.
                </p>

                {paymentId && (
                    <div className="payment-details">
                        <p>
                            <strong>Payment ID:</strong>
                        </p>
                        <span>{paymentId}</span>
                    </div>
                )}

                <div className="success-actions">
                    <button onClick={() => navigate("/orders")}>
                        View My Orders
                    </button>

                    <button
                        className="continue-shopping"
                        onClick={() => navigate("/")}
                    >
                        Continue Shopping
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OrderSuccess;