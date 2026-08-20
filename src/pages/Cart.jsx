import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

function Cart() {

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);


    // =========================
    // LOAD CART
    // =========================

    useEffect(() => {

        loadCart();

    }, []);


	const user = JSON.parse(
	    localStorage.getItem("user")
	);

	const cartKey = user
	    ? `cart_${user.id}`
	    : null;

	/*const savedCart =
	    JSON.parse(
	        localStorage.getItem(cartKey)
	    ) || [];*/
	
    const loadCart = () => {

        const savedCart =
            JSON.parse(localStorage.getItem(cartKey)) || [];

        setCart(savedCart);

    };


    // =========================
    // INCREASE QUANTITY
    // =========================

    const increaseQuantity = (id) => {

        const updatedCart = cart.map(item => {

            if (item.id === id) {

                return {
                    ...item,
                    quantity: item.quantity + 1
                };

            }

            return item;

        });


        setCart(updatedCart);

        localStorage.setItem(
           cartKey,
            JSON.stringify(updatedCart)
        );

    };


    // =========================
    // DECREASE QUANTITY
    // =========================

    const decreaseQuantity = (id) => {

        const updatedCart = cart.map(item => {

            if (item.id === id) {

                return {
                    ...item,
                    quantity: Math.max(
                        1,
                        item.quantity - 1
                    )
                };

            }

            return item;

        });


        setCart(updatedCart);

        localStorage.setItem(
           cartKey,
            JSON.stringify(updatedCart)
        );

    };


    // =========================
    // REMOVE PRODUCT
    // =========================

    const removeItem = (id) => {

        const updatedCart =
            cart.filter(item => item.id !== id);


        setCart(updatedCart);

        localStorage.setItem(
           cartKey,
            JSON.stringify(updatedCart)
        );

    };


    // =========================
    // TOTAL
    // =========================

    const totalAmount = cart.reduce(

        (total, item) =>

            total +
            Number(item.price) *
            Number(item.quantity),

        0

    );


    // =========================
    // ORDER NOW
    // =========================

    const orderNow = () => {

        const token =
            localStorage.getItem("token");


        // User not logged in
        if (!token) {

            navigate("/login", {

                state: {
                    redirectTo: "/cart",
                    checkoutAfterLogin: true
                }

            });

            return;

        }


        // Cart empty
        if (cart.length === 0) {

            alert("Your cart is empty");

            return;

        }


        // Go to checkout
        navigate("/checkout", {

            state: {

                cart: cart,

                totalAmount: totalAmount

            }

        });

    };


    // =========================
    // EMPTY CART
    // =========================

    if (cart.length === 0) {

        return (

            <div className="empty-cart">

                <div className="empty-cart-icon">
                    🛒
                </div>

                <h2>Your Cart is Empty</h2>

                <p>
                    Add some products to your cart
                </p>

                <button
                    className="btn-shopping"
                    onClick={() => navigate("/")}
                >
                    Continue Shopping
                </button>

            </div>

        );

    }


    return (

        <div className="cart-page">


            {/* =========================
                LEFT SIDE
            ========================= */}

            <div className="cart-products">

                <h2>
                    My Cart ({cart.length} Items)
                </h2>


                {cart.map((item) => (

                    <div
                        className="cart-item"
                        key={item.id}
                    >


                        {/* IMAGE */}

                        <div className="cart-item-image">

                            <img
                                src={`${import.meta.env.VITE_API_URL}${item.imageUrl}`}
                                alt={item.productName}
                            />

                        </div>


                        {/* DETAILS */}

                        <div className="cart-item-details">

                            <h3>
                                {item.productName}
                            </h3>


                            <p className="cart-item-price">

                                ₹{item.price}

                            </p>


                            {/* QUANTITY */}

                            <div className="quantity-control">

                                <button
                                    onClick={() =>
                                        decreaseQuantity(
                                            item.id
                                        )
                                    }
                                >
                                    −
                                </button>


                                <span>
                                    {item.quantity}
                                </span>


                                <button
                                    onClick={() =>
                                        increaseQuantity(
                                            item.id
                                        )
                                    }
                                >
                                    +
                                </button>

                            </div>


                            {/* REMOVE */}

                            <button
                                className="remove-btn"
                                onClick={() =>
                                    removeItem(item.id)
                                }
                            >
                                Remove
                            </button>

                        </div>


                        {/* ITEM TOTAL */}

                        <div className="cart-item-total">

                            ₹
                            {Number(item.price) *
                                Number(item.quantity)}

                        </div>


                    </div>

                ))}

            </div>


            {/* =========================
                RIGHT SIDE SUMMARY
            ========================= */}

            <div className="cart-summary">

                <h2>
                    Price Details
                </h2>


                <div className="summary-row">

                    <span>
                        Items
                    </span>

                    <span>
                        {cart.length}
                    </span>

                </div>


                <div className="summary-row">

                    <span>
                        Total Quantity
                    </span>

                    <span>
                        {cart.reduce(
                            (total, item) =>
                                total + item.quantity,
                            0
                        )}
                    </span>

                </div>


                <hr />


                <div className="summary-total">

                    <span>
                        Total Amount
                    </span>

                    <strong>
                        ₹{totalAmount}
                    </strong>

                </div>


                <button
                    className="order-now-btn"
                    onClick={orderNow}
                >
                    ⚡ Order Now
                </button>

            </div>


        </div>

    );

}

export default Cart;