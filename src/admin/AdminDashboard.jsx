import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

function AdminDashboard() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/admin/login");
    };

    return (
        <div className="admin-container">

            {/* Sidebar */}
            <aside className="admin-sidebar">

                <h2 className="admin-logo">
                    ⚡ Radhe Electronics
                </h2>

                <nav className="admin-menu">

                    <Link to="/admin/dashboard" className="menu-item active">
                        🏠 Dashboard
                    </Link>

                    <Link to="/admin/products" className="menu-item">
                        📦 Manage Products
                    </Link>

                    <Link to="/admin/add-product" className="menu-item">
                        ➕ Add Product
                    </Link>

                    <Link to="/admin/orders" className="menu-item">
                        🛒 Orders
                    </Link>

                    <Link to="/admin/users" className="menu-item">
                        👥 Users
                    </Link>

                </nav>

                <button className="logout-btn" onClick={logout}>
                    🚪 Logout
                </button>

            </aside>


            {/* Main Content */}
            <main className="admin-main">

                {/* Header */}
                <header className="admin-header">

                    <div>
                        <h1>Admin Dashboard</h1>
                        <p>Welcome back, Admin 👋</p>
                    </div>

                    <div className="admin-profile">
                        👤 Admin
                    </div>

                </header>


                {/* Dashboard Cards */}
                <section className="dashboard-cards">

                    <div className="dashboard-card">
                        <div className="card-icon">📦</div>
                        <div>
                            <h3>Products</h3>
                            <p>120</p>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-icon">🛒</div>
                        <div>
                            <h3>Orders</h3>
                            <p>45</p>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-icon">👥</div>
                        <div>
                            <h3>Users</h3>
                            <p>350</p>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-icon">💰</div>
                        <div>
                            <h3>Total Sales</h3>
                            <p>₹1,25,000</p>
                        </div>
                    </div>

                </section>


                {/* Quick Actions */}
                <section className="quick-section">

                    <h2>Quick Actions</h2>

                    <div className="quick-actions">

                        <Link to="/admin/add-product" className="quick-card">
                            <span>➕</span>
                            <h3>Add Product</h3>
                            <p>Add a new electronics product</p>
                        </Link>

                        <Link to="/admin/products" className="quick-card">
                            <span>📦</span>
                            <h3>Manage Products</h3>
                            <p>Edit or delete products</p>
                        </Link>

                        <Link to="/admin/orders" className="quick-card">
                            <span>🛒</span>
                            <h3>View Orders</h3>
                            <p>Check customer orders</p>
                        </Link>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default AdminDashboard;