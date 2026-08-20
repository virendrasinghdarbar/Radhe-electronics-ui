import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Checkout.css";

function Checkout() {

    const location = useLocation();
    const navigate = useNavigate();
	
	const [selectedAddress, setSelectedAddress] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    /*
     * Data can come from:
     *
     * 1. ProductDetails -> Buy Now
     *
     * 2. Cart -> Order Now
     */

    const product = location.state?.product;
    const cart = location.state?.cart;


    // =====================================
    // CHECK LOGIN
    // =====================================

	useEffect(() => {
	    if (!token) {
	        navigate("/login", {
	            state: {
	                redirectTo: "/checkout"
	            }
	        });
	        return;
	    }

	    checkAddress();
	}, [token, navigate]);


    // =====================================
    // CHECK USER ADDRESS
    // =====================================

	const checkAddress = async () => {
	    try {
	        setLoading(true);

	        const response = await api.get(
	            "/address/my-address",
	            {
	                headers: {
	                    Authorization: `Bearer ${token}`
	                }
	            }
	        );

	        console.log("Address API response:", response.data);

	        // If backend directly returns List<Address>
	        const data = response.data.data || response.data;

			setAddresses(data);

			       // Select first address by default
			       if (data.length > 0) {
			           setSelectedAddress(data[0].id);
			       }
				   
	    } catch (error) {

	        console.error(
	            "Address error:",
	            error.response?.data || error.message
	        );

	        if (error.response?.status === 404) {
	            setAddresses([]);
	        }

	    } finally {
	        setLoading(false);
	    }
	};
	
    // =====================================
    // CREATE ORDER ITEMS
    // =====================================

    let orderItems = [];

    if (cart && cart.length > 0) {

        orderItems = cart;

    } else if (product) {

        orderItems = [
            {
                ...product,
                quantity:
                    location.state?.quantity || 1
            }
        ];

    }


    // =====================================
    // TOTAL AMOUNT
    // =====================================

    const totalAmount = orderItems.reduce(

        (total, item) => {

            return (
                total +
                Number(item.price) *
                Number(item.quantity)
            );

        },

        0

    );


    // =====================================
    // ADD ADDRESS
    // =====================================

    const addAddress = () => {

        navigate("/add-address", {

            state: {

                cart: orderItems,

                totalAmount: totalAmount

            }

        });

    };


    // =====================================
    // CONTINUE TO PAYMENT
    // =====================================
	const continueToPayment = () => {

	    if (!selectedAddress) {
	        alert("Please select a delivery address");
	        return;
	    }

	    const address = addresses.find(
	        (item) => item.id === selectedAddress
	    );

	    console.log("Selected Address:", address);

	    // Save selected address for payment page
	    localStorage.setItem(
	        "selectedAddress",
	        JSON.stringify(address)
	    );
		
		localStorage.setItem(
			        "totalAmount",
			        JSON.stringify(totalAmount)
			    );

	    navigate("/payment");
	};

	{/* =================================
	               Deleted address
	   ================================= */}

	const deleteSelectedAddress = async () => {

	    if (!selectedAddress) {
	        alert("Please select an address");
	        return;
	    }

	    const confirmDelete = window.confirm(
	        "Are you sure you want to delete this address?"
	    );

	    if (!confirmDelete) {
	        return;
	    }

	    try {

	        setLoading(true);

	        await api.delete(
	            `/address/${selectedAddress}`,
	            {
	                headers: {
	                    Authorization: `Bearer ${token}`
	                }
	            }
	        );

	        // Remove deleted address from UI
	        const remainingAddresses = addresses.filter(
	            (address) => address.id !== selectedAddress
	        );

	        setAddresses(remainingAddresses);

	        // Select another address automatically
	        if (remainingAddresses.length > 0) {
	            setSelectedAddress(remainingAddresses[0].id);
	        } else {
	            setSelectedAddress(null);
	        }

	    } catch (error) {

	        console.error("Delete address error:", error);

	        alert("Unable to delete address");

	    } finally {

	        setLoading(false);

	    }
	};

    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <div className="checkout-loading">

                Checking your address...

            </div>

        );

    }


    // =====================================
    // NO PRODUCTS
    // =====================================

    if (orderItems.length === 0) {

        return (

            <div className="checkout-empty">

                <h2>
                    No products to checkout
                </h2>

                <button
                    onClick={() =>
                        navigate("/")
                    }
                >
                    Continue Shopping
                </button>

            </div>

        );

    }


    return (

        <div className="checkout-page">


            {/* =================================
                LEFT SIDE
            ================================= */}

            <div className="checkout-left">


                {/* PRODUCTS */}

                <div className="checkout-section">

                    <h2>
                        Order Summary
                    </h2>


                    {orderItems.map((item) => (

                        <div
                            className="checkout-product"
                            key={item.id}
                        >

                            <div className="checkout-image">

                                <img
                                    src={`${import.meta.env.VITE_API_URL}${item.imageUrl}`}
                                    alt={item.productName}
                                />

                            </div>


                            <div className="checkout-product-info">

                                <h3>
                                    {item.productName}
                                </h3>

                                <p>
                                    ₹{item.price}
                                </p>

                                <p>
                                    Quantity:{" "}
                                    {item.quantity}
                                </p>

                            </div>


                            <div className="checkout-item-total">

                                ₹
                                {Number(item.price) *
                                    Number(item.quantity)}

                            </div>

                        </div>

                    ))}

                </div>


                {/* =================================
                    ADDRESS
                ================================= */}

                <div className="checkout-section">

               		<div className="address-section">

					    <h2>Delivery Address</h2>

						{addresses.length === 0 ? (
						    <div className="no-address">
						        <p>No delivery address found.</p>

						        <button
						            className="add-address-btn"
						            onClick={addAddress}
						        >
						            + Add Delivery Address
						        </button>
						    </div>
						) : (
						    <div className="address-list">
						        {addresses.map((address) => (
						            <div
						                key={address.id}
						                className={`address-card ${
						                    selectedAddress === address.id
						                        ? "selected"
						                        : ""
						                }`}
						                onClick={() => setSelectedAddress(address.id)}
						            >
						                <input
						                    type="radio"
						                    name="deliveryAddress"
						                    checked={selectedAddress === address.id}
						                    onChange={() =>
						                        setSelectedAddress(address.id)
						                    }
						                />

						                <div className="address-details">
						                    <h3>{address.name}</h3>
						                    <p>{address.mobile}</p>
						                    <p>{address.addressLine}</p>
						                    <p>
						                        {address.city}, {address.state} -{" "}
						                        {address.pincode}
						                    </p>
						                </div>
						            </div>
						        ))}
						    </div>
						)}
						
					    <div className="address-actions">

					        <button
					            className="delete-address-btn"
					            disabled={!selectedAddress}
					            onClick={deleteSelectedAddress}
					        >
					            Delete Selected Address
					        </button>
						</div>
						
					    </div>

                    

                    

                </div>

            </div>

			


            {/* =================================
                RIGHT SIDE PRICE
            ================================= */}

            <div className="checkout-right">

                <div className="price-details">

                    <h2>
                        Price Details
                    </h2>


                    <div className="price-row">

                        <span>
                            Items
                        </span>

                        <span>
                            {orderItems.length}
                        </span>

                    </div>


                    <div className="price-row">

                        <span>
                            Total Quantity
                        </span>

                        <span>

                            {orderItems.reduce(
                                (total, item) =>
                                    total +
                                    Number(item.quantity),
                                0
                            )}

                        </span>

                    </div>


                    <div className="price-row">

                        <span>
                            Delivery
                        </span>

                        <span className="free">
                            FREE
                        </span>

                    </div>


                    <hr />


                    <div className="total-row">

                        <span>
                            Total Amount
                        </span>

                        <strong>
                            ₹{totalAmount}
                        </strong>

                    </div>


                    <button
                        className="continue-payment-btn"
                        onClick={continueToPayment}
						disabled={!selectedAddress}
                       // disabled={!addresses}
                    >
                        Continue to Payment
                    </button>


					{addresses.length === 0 && (
					    <p className="address-warning">
					        Please add delivery address before payment.
					    </p>
					)}

                </div>

            </div>

        </div>

    );

}

export default Checkout;