import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/AddAddress.css";

function AddAddress() {

    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem("token");


    const [formData, setFormData] = useState({

        name: "",
        mobile: "",
        houseNo: "",
        street: "",
        landmark: "",
        pincode: "",
        city: "",
        state: ""

    });


    const [loadingPincode, setLoadingPincode] =
        useState(false);

    const [saving, setSaving] =
        useState(false);


    // =====================================
    // HANDLE INPUT
    // =====================================

    const handleChange = (e) => {

        const { name, value } = e.target;


        // Only numbers for mobile
        if (name === "mobile") {

            if (!/^\d{0,10}$/.test(value)) {
                return;
            }

        }


        // Only numbers for pincode
        if (name === "pincode") {

            if (!/^\d{0,6}$/.test(value)) {
                return;
            }

        }


        setFormData({

            ...formData,

            [name]: value

        });


        // Automatically lookup when 6 digits
        if (
            name === "pincode" &&
            value.length === 6
        ) {

            getPincodeDetails(value);

        }

    };


    // =====================================
    // GET PINCODE DETAILS
    // =====================================

    const getPincodeDetails = async (pincode) => {

        try {

            setLoadingPincode(true);


            const response = await fetch(
                `https://api.postalpincode.in/pincode/${pincode}`
            );


            const data = await response.json();


            if (
                data[0]?.Status !== "Success" ||
                !data[0]?.PostOffice?.length
            ) {

                alert("Invalid PIN code");

                setFormData(prev => ({

                    ...prev,

                    city: "",
                    state: ""

                }));

                return;

            }


            const postOffice =
                data[0].PostOffice[0];


            setFormData(prev => ({

                ...prev,

                city:
                    postOffice.District || "",

                state:
                    postOffice.State || ""

            }));

        }

        catch (error) {

            console.error(
                "PIN code error:",
                error
            );

            alert(
                "Unable to get PIN code details"
            );

        }

        finally {

            setLoadingPincode(false);

        }

    };


    // =====================================
    // SAVE ADDRESS
    // =====================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!token) {

            navigate("/login");

            return;

        }


        // Basic validation

        if (
            !formData.name ||
            !formData.mobile ||
            !formData.houseNo ||
            !formData.street ||
            !formData.pincode ||
            !formData.city ||
            !formData.state
        ) {

            alert(
                "Please fill all required fields"
            );

            return;

        }


        if (formData.mobile.length !== 10) {

            alert(
                "Please enter valid 10 digit mobile number"
            );

            return;

        }


        if (formData.pincode.length !== 6) {

            alert(
                "Please enter valid 6 digit PIN code"
            );

            return;

        }


        try {

            setSaving(true);


            const response = await api.post(

                "/address",

                formData,

                {
                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );


            console.log(
                "Address saved:",
                response.data
            );


            alert(
                "Address saved successfully"
            );


            // Return to checkout
            navigate("/checkout", {

                state: {

                    cart:
                        location.state?.cart,

                    totalAmount:
                        location.state?.totalAmount,

                    address:
                        response.data.data ||
                        response.data

                }

            });

        }

        catch (error) {

            console.error(
                "Save address error:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Failed to save address"
            );

        }

        finally {

            setSaving(false);

        }

    };


    return (

        <div className="address-page">


            <div className="address-container">


                <h1>
                    Add Delivery Address
                </h1>


                <p className="address-subtitle">
                    Enter your delivery details
                </p>


                <form
                    onSubmit={handleSubmit}
                >


                    {/* =====================
                        NAME
                    ===================== */}

                    <div className="form-group">

                        <label>
                            Full Name *
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                        />

                    </div>


                    {/* =====================
                        MOBILE
                    ===================== */}

                    <div className="form-group">

                        <label>
                            Mobile Number *
                        </label>

                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="10 digit mobile number"
                            maxLength="10"
                        />

                    </div>


                    {/* =====================
                        HOUSE
                    ===================== */}

                    <div className="form-group">

                        <label>
                            House / Flat / Building *
                        </label>

                        <input
                            type="text"
                            name="houseNo"
                            value={formData.houseNo}
                            onChange={handleChange}
                            placeholder="House / Flat / Building"
                        />

                    </div>


                    {/* =====================
                        STREET
                    ===================== */}

                    <div className="form-group">

                        <label>
                            Area / Street *
                        </label>

                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            placeholder="Area / Street / Colony"
                        />

                    </div>


                    {/* =====================
                        LANDMARK
                    ===================== */}

                    <div className="form-group">

                        <label>
                            Landmark
                        </label>

                        <input
                            type="text"
                            name="landmark"
                            value={formData.landmark}
                            onChange={handleChange}
                            placeholder="Nearby landmark"
                        />

                    </div>


                    {/* =====================
                        PINCODE
                    ===================== */}

                    <div className="form-group">

                        <label>
                            PIN Code *
                        </label>

                        <div className="pincode-wrapper">

                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                placeholder="Enter 6 digit PIN code"
                                maxLength="6"
                            />


                            {loadingPincode && (

                                <span>
                                    Checking...
                                </span>

                            )}

                        </div>

                    </div>


                    {/* =====================
                        CITY
                    ===================== */}

                    <div className="form-row">


                        <div className="form-group">

                            <label>
                                City / District *
                            </label>

                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="City / District"
                                readOnly
                            />

                        </div>


                        {/* =====================
                            STATE
                        ===================== */}

                        <div className="form-group">

                            <label>
                                State *
                            </label>

                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="State"
                                readOnly
                            />

                        </div>


                    </div>


                    {/* =====================
                        BUTTONS
                    ===================== */}

                    <div className="address-buttons">


                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() =>
                                navigate(
                                    "/checkout",
                                    {
                                        state:
                                            location.state
                                    }
                                )
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="save-address-btn"
                            disabled={saving}
                        >

                            {saving
                                ? "Saving..."
                                : "Save Address"}

                        </button>


                    </div>


                </form>

            </div>

        </div>

    );

}

export default AddAddress;