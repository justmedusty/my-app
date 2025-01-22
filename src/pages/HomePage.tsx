import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('/products')}>
                Products
            </button>
            <button onClick={() => navigate('/carts')}>
                Carts
            </button>
        </div>
    );
};

export default DashboardPage;