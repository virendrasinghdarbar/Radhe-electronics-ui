import React, { useState } from "react";
import api from "../services/api";
import "../styles/AddProduct.css";

function AddProduct() {

	const [isSubmitting, setIsSubmitting] = useState(false);
	
    const [product, setProduct] = useState({
        productName: "",
        description: "",
        price: "",
		discount: "",
        quantity: "",
        brand: "",
        category: ""
    });

    const [imageFile, setImageFile] = useState(null);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

		// Prevent multiple clicks
		   if (isSubmitting) {
		       return;
		   }

		   setIsSubmitting(true);
		   
        const token = localStorage.getItem("token");

        const formData = new FormData();

        formData.append("productName", product.productName);
        formData.append("description", product.description);
        formData.append("price", product.price);
		formData.append("discount", product.discount);
        formData.append("quantity", product.quantity);
        formData.append("brand", product.brand);
        formData.append("category", product.category);
		

        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {

            await api.post(
                "/admin/products",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Product added successfully!");

            setProduct({
                productName: "",
                description: "",
                price: "",
				discount: "",
                quantity: "",
                brand: "",
                category: ""
            });

            setImageFile(null);

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Failed to add product"
            );
        }
		finally {
		        // Enable button again after request completes
		        setIsSubmitting(false);
		    }
    };

    return (
        <div className="add-product-page">

            <div className="add-product-card">

                <div className="product-header">
                    <h2>Add New Product</h2>
                    <p>Enter product details and upload product image</p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-grid">

                        <div className="form-group">
                            <label>Product Name</label>

                            <input
                                type="text"
                                name="productName"
                                placeholder="Enter product name"
                                value={product.name}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div className="form-group">
                            <label>Brand</label>

                            <input
                                type="text"
                                name="brand"
                                placeholder="Enter brand"
                                value={product.brand}
                                onChange={handleChange}
                            />
                        </div>


                        <div className="form-group">
                            <label>Price</label>

                            <input
                                type="number"
                                name="price"
                                placeholder="Enter price"
                                value={product.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

						<div className="form-group">
						     <label>Old Price</label>

						     <input
						         type="number"
						         name="discount"
						         placeholder="Enter old price"
						         value={product.discount}
						         onChange={handleChange}
						         required
						       />
						      </div>

                        <div className="form-group">
                            <label>Stock</label>

                            <input
                                type="number"
                                name="quantity"
                                placeholder="Enter stock quantity"
                                value={product.quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div className="form-group">
                            <label>Category</label>

                            <input
                                type="text"
                                name="category"
                                placeholder="Enter category"
                                value={product.category}
                                onChange={handleChange}
                            />
                        </div>


                        <div className="form-group image-group">
                            <label>Product Image</label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setImageFile(e.target.files[0])
                                }
                            />

                            {imageFile && (
                                <span className="file-name">
                                    {imageFile.name}
                                </span>
                            )}
                        </div>

                    </div>


                    <div className="form-group description-group">
                        <label>Description</label>

                        <textarea
                            name="description"
                            placeholder="Enter product description"
                            value={product.description}
                            onChange={handleChange}
                            rows="5"
                        />
                    </div>


                    <div className="button-container">
						<button
						    type="submit"
						    className="add-product-btn"
						    disabled={isSubmitting}
						>
						    {isSubmitting ? "Saving Product..." : "Add Product"}
						</button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddProduct;