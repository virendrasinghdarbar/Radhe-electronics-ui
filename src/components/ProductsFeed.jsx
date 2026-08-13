import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ProductsHome.css";

function ProductsHome() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchProducts();

    }, []);

    const fetchProducts = async () => {

        try {

            const response = await axios.get(
                "/products"
            );

            setProducts(response.data);

        } catch (error) {

            console.error("Error fetching products:", error);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return <h2>Loading products...</h2>;
    }

    return (
        <div className="home-container">

            <div className="product-grid">

                {products.map((product) => (

                    <div className="product-card" key={product.id}>

                        <img
                            src={`http://localhost:8080${product.imageUrl}`}
                            alt={product.name}
                        />

                        <h3>{product.name}</h3>

                        <p>{product.description}</p>

                        <h3>
                            ₹{product.price.toLocaleString("en-IN")}
                        </h3>

                        <button>
                            Add to Cart
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default ProductsHome;