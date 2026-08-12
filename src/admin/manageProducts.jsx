import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManageProducts() {

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    const token =
        localStorage.getItem("token");

    const loadProducts = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/admin/products",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setProducts(response.data);

        } catch (error) {

            console.error(error);

            if (error.response?.status === 403) {
                alert("Access denied");
            }
        }
    };

    useEffect(() => {

        loadProducts();

    }, []);

    const deleteProduct = async (id) => {

        if (!window.confirm(
            "Are you sure you want to delete this product?"
        )) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8080/api/admin/products/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert("Product deleted");

            loadProducts();

        } catch (error) {

            console.error(error);

            alert("Delete failed");
        }
    };

    return (
        <div className="manage-products">

            <h2>Manage Products</h2>

            <button
                onClick={() =>
                    navigate("/admin/add-product")
                }
            >
                + Add Product
            </button>

            <table>

                <thead>

                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {products.map(product => (

                        <tr key={product.id}>

                            <td>

                                <img
                                    src={
                                        "http://localhost:8080"
                                        + product.imageUrl
                                    }
                                    alt={product.name}
                                    width="70"
                                    height="70"
                                />

                            </td>

                            <td>
                                {product.name}
                            </td>

                            <td>
                                {product.brand}
                            </td>

                            <td>
                                {product.category}
                            </td>

                            <td>
                                ₹{product.price}
                            </td>

                            <td>
                                {product.stock}
                            </td>

                            <td>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/admin/edit-product/${product.id}`
                                        )
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        deleteProduct(
                                            product.id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default ManageProducts;