import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/HomePage";
import Products from "./pages/Products";
import Carts from "./pages/Carts";

const App: React.FC = () => {
    return (<Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<DashboardPage/>}/>
                <Route path="/carts" element={<Carts/>}/>
                <Route path="/products" element={<Products/>}/>
            </Routes>
        </Router>);
};

export default App;