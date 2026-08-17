import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/ProductsHome.css";

function ProductsHome() {

    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);

 //   const token = localStorage.getItem("token");


 
 const navigate = useNavigate();
 
    useEffect(() => {
        fetchProducts();
    }, []);


    const fetchProducts = async () => {

        try {

            setLoading(true);

            const response = await api.get(
                "/products",
               
            );

            console.log("Products:", response.data);

            setProducts(response.data);

        } catch (error) {

            console.error(
                "Error fetching products:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    // Filter products
    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter(
                product =>
                    product.category?.toLowerCase() ===
                    selectedCategory.toLowerCase()
            );


    if (loading) {

        return (
            <div className="products-loading">
                Loading products...
            </div>
        );
    }


    return (

		<div className="product-grid">

		    {filteredProducts.map((product) => (

				<div
				      className="product-card"
				      key={product.id}
				      onClick={()=>navigate(`/products/${product.id}`)} >

		            <div className="product-image-container">
		                <img
							src={`${import.meta.env.VITE_API_URL}${product.imageUrl}`}
		                    alt={product.productName}
		                />
		            </div>

		            <h3>{product.productName}</h3>

		            <div className="rating">
		                ⭐ {product.rating}
		                <span> ({product.reviews})</span>
		            </div>

		            <div className="price">
		                ₹{product.price}
		            </div>

		            <div className="old-price">
		                ₹{product.discount}
		                <span> {product.discount}</span>
		            </div>

		  
		        </div>

		    ))}

		</div>
    );
}

export default ProductsHome;