import { Routes, Route } from "react-router-dom";

import AdminRoute from "./admin/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterEmail from "./pages/RegisterEmail";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import AdminLogin from "./admin/AdminLogin";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import EditProduct from "./admin/EditProduct";
import AdminDashboard from "./admin/AdminDashboard";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {

    return (
        <Routes>

            {/* Normal User Pages */}

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

			<Route
			    path="/registeremail"
			    element={<RegisterEmail />}
		    />
            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

			<Route
			    path="/products/:id"
			    element={<ProductDetails />}
			/>
			

			<Route
			    path="/cart"
			    element={<Cart />}
			/>
            {/* ================= ADMIN ================= */}

            {/* Admin Login - Public */}
            <Route
                path="/admin/login"
                element={<AdminLogin />}
            />


            {/* Admin Dashboard - Protected */}
			<Route
			               path="/admin/dashboard"
			               element={
			                   <AdminRoute>
			                       <AdminDashboard />
			                   </AdminRoute>
			               }
			           />
			

            {/* Manage Products - Protected */}
            <Route
                path="/admin/products"
                element={
                    <AdminRoute>
                        <ManageProducts />
                    </AdminRoute>
                }
            />


            {/* Add Product - Protected */}
            <Route
                path="/admin/add-product"
                element={
                    <AdminRoute>
                        <AddProduct />
                    </AdminRoute>
                }
            />


            {/* Edit Product - Protected */}
            <Route
                path="/admin/edit-product/:id"
                element={
                    <AdminRoute>
                        <EditProduct />
                    </AdminRoute>
                }
            />

        </Routes>
    );
}

export default App;