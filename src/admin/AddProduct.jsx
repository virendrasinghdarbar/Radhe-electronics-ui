import React, { useState } from "react";
import axios from "axios";
import api from "../services/api";


function AddProduct() {

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        brand: "",
        category: ""
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {

        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const token =
            localStorage.getItem("token");

        const formData = new FormData();

        formData.append("name", product.name);
        formData.append("description",product.description);
        formData.append("price", product.price);
        formData.append("stock", product.stock);
        formData.append("brand", product.brand);
        formData.append("category",product.category);

        if (image) {
            formData.append("image", image);
        }

        try {

            await api.post(
                "/admin/products",
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert("Product added successfully!");

            setProduct({
                name: "",
                description: "",
                price: "",
                stock: "",
                brand: "",
                category: ""
            });

            setImage({image:""});

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Failed to add product"
            );
        }
    };

    return (
        <div className="add-product">

            <h2>Add Product</h2>

            <form onSubmit={handleSubmit}>

                <input
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={product.stock}
                    onChange={handleChange}
                    required
                />

                <input
                    name="brand"
                    placeholder="Brand"
                    value={product.brand}
                    onChange={handleChange}
                />

                <input
                    name="category"
                    placeholder="Category"
                    value={product.category}
                    onChange={handleChange}
                />

				<input
				    type="file"
				    accept="image/*"
				    multiple
				    onChange={(e) =>
				        setImages(Array.from(e.target.files))
				    }
				/>

                <button type="submit">
                    Add Product
                </button>

            </form>

        </div>
    );
}

export default AddProduct;