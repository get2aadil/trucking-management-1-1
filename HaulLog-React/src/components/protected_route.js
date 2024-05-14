import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

const ProtectedRoute = ({ children, ...rest }) => {
    const { isLoggedIn } = useAuth();
    const element = children ? children : <Outlet />;

    return isLoggedIn ? element : <Navigate to="/" replace />;

};

export default ProtectedRoute;