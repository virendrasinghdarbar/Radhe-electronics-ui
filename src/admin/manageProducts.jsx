import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/ManageProduct.css";

function ManageProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editingProduct, setEditingProduct] = useState(null);
    const [editImage, setEditImage] = useState(null);

    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const token = localStorage.getItem("token");

    // =========================
    // Fetch Products
    // =========================

    const fetchProducts = async () => {

        try {

            setLoading(true);

            const response = await api.get(
                "/products",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setProducts(response.data);

        } catch (error) {

            console.error("Error fetching products:", error);

            alert("Failed to load products");

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {
        fetchProducts();
    }, []);


    // =========================
    // Open Edit
    // =========================

    const handleEdit = (product) => {

        setEditingProduct({
            ...product
        });

        setEditImage(null);
    };


    // =========================
    // Edit Input Change
    // =========================

    const handleEditChange = (e) => {

        setEditingProduct({
            ...editingProduct,
            [e.target.name]: e.target.value
        });
    };


    // =========================
    // Update Product
    // =========================

    const handleUpdate = async (e) => {

        e.preventDefault();

        if (saving) {
            return;
        }

        setSaving(true);

        try {

            const formData = new FormData();

            formData.append(
                "name",
                editingProduct.name
            );

            formData.append(
                "description",
                editingProduct.description
            );

            formData.append(
                "price",
                editingProduct.price
            );

            formData.append(
                "stock",
                editingProduct.stock
            );

            formData.append(
                "brand",
                editingProduct.brand
            );

            formData.append(
                "category",
                editingProduct.category
            );

            if (editImage) {
                formData.append(
                    "image",
                    editImage
                );
            }


            await api.put(
                `/admin/products/${editingProduct.id}`,
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            alert("Product updated successfully!");

            setEditingProduct(null);

            setEditImage(null);

            fetchProducts();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Failed to update product"
            );

        } finally {

            setSaving(false);
        }
    };


    // =========================
    // Delete Product
    // =========================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this product?"
            );

        if (!confirmDelete) {
            return;
        }

        if (deletingId) {
            return;
        }

        setDeletingId(id);

        try {

            await api.delete(
                `/admin/products/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert("Product deleted successfully!");

            setProducts(
                products.filter(
                    product => product.id !== id
                )
            );

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Failed to delete product"
            );

        } finally {

            setDeletingId(null);
        }
    };


    // =========================
    // Loading
    // =========================

    if (loading) {

        return (
            <div className="products-loading">
                Loading products...
            </div>
        );
    }


    return (

        <div className="manage-products-page">

            <div className="products-card">

                <div className="products-header">

                    <div>
                        <h2>Manage Products</h2>

                        <p>
                            View, edit and delete your products
                        </p>
                    </div>

                    <div className="product-count">
                        {products.length} Products
                    </div>

                </div>


                {/* =========================
                    Product Table
                ========================= */}

                <div className="table-container">

                    <table className="products-table">

                        <thead>

                            <tr>

                                <th>Image</th>

                                <th>Product</th>

                                <th>Brand</th>

                                <th>Category</th>

                                <th>Price</th>

                                <th>Stock</th>

                                <th>Actions</th>

                            </tr>

                        </thead>


                        <tbody>

                            {products.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="no-products"
                                    >
                                        No products found
                                    </td>

                                </tr>

                            ) : (

                                products.map((product) => (

                                    <tr key={product.id}>

                                        <td>

                                            <img
                                                src={`http://localhost:8080${product.imageUrl}`}
                                                alt={product.name}
                                                className="product-image"
                                            />

                                        </td>


                                        <td>

                                            <div className="product-name">

                                                {product.name}

                                            </div>

                                            <div className="product-description">

                                                {product.description}

                                            </div>

                                        </td>


                                        <td>
                                            {product.brand}
                                        </td>


                                        <td>

                                            <span className="category-badge">

                                                {product.category}

                                            </span>

                                        </td>


                                        <td className="price">

                                            ₹{product.price}

                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    product.stock > 0
                                                        ? "stock available"
                                                        : "stock out"
                                                }
                                            >

                                                {product.stock}

                                            </span>

                                        </td>


                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        handleEdit(product)
                                                    }
                                                    disabled={
                                                        deletingId !== null ||
                                                        saving
                                                    }
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDelete(
                                                            product.id
                                                        )
                                                    }
                                                    disabled={
                                                        deletingId !== null ||
                                                        saving
                                                    }
                                                >

                                                    {deletingId === product.id
                                                        ? "Deleting..."
                                                        : "Delete"}

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* =========================
                Edit Modal
            ========================= */}

            {editingProduct && (

                <div className="modal-overlay">

                    <div className="edit-modal">

                        <div className="modal-header">

                            <div>

                                <h2>Edit Product</h2>

                                <p>
                                    Update product information
                                </p>

                            </div>


                            <button
                                className="close-btn"
                                onClick={() =>
                                    !saving &&
                                    setEditingProduct(null)
                                }
                                disabled={saving}
                            >
                                ×
                            </button>

                        </div>


                        <form
                            onSubmit={handleUpdate}
                            className="edit-form"
                        >

                            <div className="edit-grid">

                                <div className="form-group">

                                    <label>
                                        Product Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={
                                            editingProduct.name || ""
                                        }
                                        onChange={
                                            handleEditChange
                                        }
                                        required
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Brand
                                    </label>

                                    <input
                                        type="text"
                                        name="brand"
                                        value={
                                            editingProduct.brand || ""
                                        }
                                        onChange={
                                            handleEditChange
                                        }
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Price
                                    </label>

                                    <input
                                        type="number"
                                        name="price"
                                        value={
                                            editingProduct.price || ""
                                        }
                                        onChange={
                                            handleEditChange
                                        }
                                        required
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Stock
                                    </label>

                                    <input
                                        type="number"
                                        name="stock"
                                        value={
                                            editingProduct.stock || ""
                                        }
                                        onChange={
                                            handleEditChange
                                        }
                                        required
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Category
                                    </label>

                                    <input
                                        type="text"
                                        name="category"
                                        value={
                                            editingProduct.category || ""
                                        }
                                        onChange={
                                            handleEditChange
                                        }
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Product Image
                                    </label>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setEditImage(
                                                e.target.files[0]
                                            )
                                        }
                                    />

                                </div>

                            </div>


                            <div className="form-group description-field">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    rows="4"
                                    value={
                                        editingProduct.description || ""
                                    }
                                    onChange={
                                        handleEditChange
                                    }
                                />

                            </div>


                            <div className="modal-actions">

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() =>
                                        setEditingProduct(null)
                                    }
                                    disabled={saving}
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="save-btn"
                                    disabled={saving}
                                >

                                    {saving
                                        ? "Saving..."
                                        : "Save Changes"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default ManageProducts;