import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        brand: "",
        category: ""
    });

    const [image, setImage] = useState(null);

    const token =
        localStorage.getItem("token");

    useEffect(() => {

        axios.get(
            `http://localhost:8080/api/products/${id}`
        )
        .then(response => {
            setProduct(response.data);
        })
        .catch(error => {
            console.error(error);
        });

    }, [id]);

    const handleChange = (e) => {

        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const updateProduct = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("name", product.name);
        formData.append(
            "description",
            product.description
        );
        formData.append("price", product.price);
        formData.append("stock", product.stock);
        formData.append("brand", product.brand);
        formData.append(
            "category",
            product.category
        );

        if (image) {
            formData.append("image", image);
        }

        try {

            await axios.put(
                `http://localhost:8080/api/admin/products/${id}`,
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert("Product updated");

            navigate("/admin/products");

        } catch (error) {

            console.error(error);

            alert("Update failed");
        }
    };

    return (
        <div className="edit-product">

            <h2>Edit Product</h2>

            <form onSubmit={updateProduct}>

                <input
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    required
                />

                <input
                    name="brand"
                    value={product.brand}
                    onChange={handleChange}
                />

                <input
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                />

                <p>Change image (optional)</p>

                <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(e) =>
                        setImage(e.target.files[0])
                    }
                />

                <button type="submit">
                    Update Product
                </button>

            </form>

        </div>
    );
}

export default EditProduct;