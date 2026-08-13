import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    console.log("========== ADMIN ROUTE ==========");
    console.log("TOKEN:", token);
    console.log("USER STRING:", userString);

    if (!token || !userString) {
        console.log("❌ Token or user missing");
        return <Navigate to="/login" replace />;
    }

    try {

        const user = JSON.parse(userString);

        console.log("USER OBJECT:", user);
        console.log("USER ROLE:", user.role.roleName);

        if (user.role.roleName !== "ADMIN") {
            console.log("❌ User is not ADMIN");
            return <Navigate to="/" replace />;
        }

        console.log("✅ ADMIN VERIFIED");
        console.log("✅ Showing Admin Dashboard");

        return children;

    } catch (error) {

        console.log("❌ JSON PARSE ERROR:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        return <Navigate to="/login" replace />;
    }
}

export default AdminRoute;