import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/ProductDetails.css";

function ProductDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchProduct();
    }, [id]);


    const fetchProduct = async () => {

        try {

            setLoading(true);

            const response = await api.get(`/products/${id}`);

            console.log("Product Details:", response.data);

            setProduct(response.data);

        } catch (error) {

            console.error(
                "Error fetching product:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    // =====================================
    // ACTUAL ADD TO CART
    // =====================================

    const addProductToCart = () => {

        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];


        const existingProduct = cart.find(
            item => item.id === product.id
        );


        console.log(
            "Existing Product:",
            existingProduct
        );


        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({

                id: product.id,

                productName: product.productName,

                price: product.price,

                imageUrl: product.imageUrl,

                quantity: 1

            });

        }


        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        alert("Product added to cart");

    };


    // =====================================
    // CHECK LOGIN + ADD TO CART
    // =====================================

    const addToCart = () => {

        const token = localStorage.getItem("token");


        // User is NOT logged in
        if (!token) {

            navigate("/login", {

                state: {
                    redirectTo: `/products/${product.id}`,
                    addToCart: true
                }

            });

            return;
        }


        // User is already logged in
        addProductToCart();

    };


    // =====================================
    // AFTER LOGIN RETURN TO THIS PAGE
    // AND AUTOMATICALLY ADD PRODUCT
    // =====================================

    useEffect(() => {

        if (!product) {
            return;
        }


        const token = localStorage.getItem("token");

        const shouldAddToCart =
            sessionStorage.getItem("addToCartAfterLogin");


        if (token && shouldAddToCart === "true") {

            sessionStorage.removeItem(
                "addToCartAfterLogin"
            );


            addProductToCart();

        }

    }, [product]);


    // =====================================
    // ORDER NOW
    // =====================================

    const orderNow = () => {

        navigate("/checkout", {

            state: {

                product: product,

                quantity: 1

            }

        });

    };


    if (loading) {

        return (
            <div className="product-details-loading">
                Loading product...
            </div>
        );

    }


    if (!product) {

        return (
            <div className="product-not-found">
                Product not found
            </div>
        );

    }


    return (

        <div className="product-details-page">


            <div className="product-details-image">

                <img
                    src={`${import.meta.env.VITE_API_URL}${product.imageUrl}`}
                    alt={product.productName}
                />

            </div>


            <div className="product-details-info">

                <h1>
                    {product.productName}
                </h1>


                <div className="details-rating">

                    ⭐ {product.rating}

                    <span>
                        ({product.reviews} Reviews)
                    </span>

                </div>


                <hr />


                <div className="details-price">

                    ₹{product.price}

                </div>


                {product.discount && (

                    <div className="details-discount">

                        <span className="discount-price">
                            ₹{product.discount}
                        </span>

                        <span className="discount-text">
                            OFF
                        </span>

                    </div>

                )}


                <div className="details-category">

                    <strong>Category:</strong>{" "}

                    {product.category}

                </div>


                <div className="details-buttons">

                    <button
                        className="btn-cart"
                        onClick={addToCart}
                    >
                        🛒 Add to Cart
                    </button>


                    <button
                        className="btn-order"
                        onClick={orderNow}
                    >
                        ⚡ Order Now
                    </button>

                </div>

            </div>

        </div>

    );
}

export default ProductDetails;