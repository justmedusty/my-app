import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/HomePage";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<DashboardPage/>} />
                <Route path="/carts" element={<button>Cart</button>} />
                <Route path="/products" element={<button>Products</button>} />
            </Routes>
        </Router>
    );
};

export default App;