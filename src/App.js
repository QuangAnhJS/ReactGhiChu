import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "./compoments/home/home";
import Login from "./compoments/login/login";
import Register from "./compoments/register/register"
import { AuthProvider, useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
    const { isAuthenticated } = useAuth();

    const router = createBrowserRouter([
        {
            path: "/",
            element: isAuthenticated ? <Home />:<Navigate to="/login" />,
        },
        {
            path: "/login",
            element: isAuthenticated ? <Navigate to="/" /> : <Login />,
        },
        {
            path: "/register",
            element: isAuthenticated ? <Navigate to="/" /> : <Register />,
        },
    ]);

    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;
