import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={"home"}>
            <button className={"home_button"} onClick={() => navigate('/products')}>
                Products
            </button>
            <button className={"home_button"} onClick={() => navigate('/carts')}>
                Carts
            </button>
        </div>
    );
};

export default DashboardPage;