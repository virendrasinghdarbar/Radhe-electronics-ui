import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function Payment() {

    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(false);


    const cart =
       // location.state?.cart || [];
		localStorage.cart ||[];
		

    const totalAmount =localStorage.totalAmount || 0;

    const address =
       localStorage.selectedAddress;

	//console.log("payment info : "+ localStorage.cart,localStorage.selectedAddress);

    useEffect(() => {

        if (!cart.length || !address) {

            navigate("/");

        }

    }, []);


    // =====================================
    // START PAYMENT
    // =====================================

    const startPayment = async () => {

        try {

            setLoading(true);


            // --------------------------------
            // CREATE RAZORPAY ORDER
            // --------------------------------

            const response =
                await api.post(
                    "/payment/create-order",
                    {
                        amount: totalAmount
                    }
                );


            const razorpayOrder =
                response.data;


            console.log(
                "Razorpay Order:",
                razorpayOrder
            );


            // --------------------------------
            // RAZORPAY OPTIONS
            // --------------------------------

            const options = {

                key:
                    razorpayOrder.key,

                amount:
                    razorpayOrder.amount,

                currency:
                    razorpayOrder.currency,

                name:
                    "My Electronics Store",

                description:
                    "Electronics Product Purchase",

                order_id:
                    razorpayOrder.id,


                prefill: {

                    name:
                        address.name,

                    contact:
                        address.mobile

                },


                notes: {

                    address:
                        `${address.houseNo}, ${address.street}, ${address.city}, ${address.state} - ${address.pincode}`

                },


                theme: {

                    color: "#2874f0"

                },


                // --------------------------------
                // PAYMENT SUCCESS
                // --------------------------------

                handler: async function (paymentResponse) {

                        console.log("Payment Response:",paymentResponse);


                        try {

                            // Send payment details
                            // to Spring Boot

                            const verifyResponse =
                                await api.post(
                                    "/payment/verify",
                                    {

                                        razorpayOrderId:paymentResponse.razorpay_order_id,

                                        razorpayPaymentId:paymentResponse.razorpay_payment_id,

                                        razorpaySignature:paymentResponse.razorpay_signature,

                                        cart:
                                            cart,

                                        address:
                                            address,

                                        totalAmount:
                                            totalAmount

                                    }
                                );


                            if (verifyResponse.data.success) {

                                // Clear cart
                                const user =
                                    JSON.parse(localStorage.getItem("user"));


                                if (user) {

                                    localStorage.removeItem(`cart_${user.id}`);

                                }


                                navigate(
                                    "/order-success",
                                    {
                                        state: {
                                            paymentId:
                                                paymentResponse
                                                    .razorpay_payment_id
                                        }
                                    }
                                );

                            }

                        }
                        catch (error) {

                            console.error(
                                "Payment verification error:",
                                error
                            );

                            alert(
                                "Payment verification failed"
                            );

                        }

                    },


                modal: {

                    ondismiss:
                        function () {

                            setLoading(false);

                        }

                }

            };


            // --------------------------------
            // OPEN RAZORPAY
            // --------------------------------

            const razorpay =
                new window.Razorpay(
                    options
                );


            razorpay.on(
                "payment.failed",
                function (response) {

                    console.error(
                        "Payment failed:",
                        response.error
                    );

                    alert(
                        response.error.description ||
                        "Payment failed"
                    );

                    setLoading(false);

                }
            );


            razorpay.open();

        }
        catch (error) {

            console.error(
                "Payment error:",
                error
            );

            alert(
                "Unable to start payment"
            );

            setLoading(false);

        }

    };


    return (

        <div
            style={{
                maxWidth: "600px",
                margin: "50px auto",
                padding: "30px",
                background: "#fff",
                borderRadius: "10px",
                boxShadow:
                    "0 2px 10px rgba(0,0,0,.1)"
            }}
        >

            <h2>
                Payment
            </h2>


            <hr />


            <h3>
                Delivery Address
            </h3>


            {address && (

                <div>

                    <p>
                        <strong>
                            {address.name}
                        </strong>
                    </p>

                    <p>
                        {address.mobile}
                    </p>

                    <p>
                        {address.houseNo},{" "}
                        {address.street}
                    </p>

                    <p>
                        {address.city},{" "}
                        {address.state}
                    </p>

                    <p>
                        PIN: {address.pincode}
                    </p>

                </div>

            )}


            <hr />


            <h2>
                Total: ₹{totalAmount}
            </h2>


            <button
                onClick={startPayment}
                disabled={loading}
                style={{
                    width: "100%",
                    padding: "15px",
                    border: "none",
                    borderRadius: "5px",
                    background: "#fb641b",
                    color: "white",
                    fontSize: "18px",
                    cursor: "pointer"
                }}
            >

                {loading
                    ? "Processing..."
                    : `Pay ₹${totalAmount}`}

            </button>

        </div>

    );

}

export default Payment;