import {useNavigate} from "react-router-dom";
import React from "react";

/*
       Since this will be in 2 places just make a component for it to avoid duplication
 */
const NavigateHome: React.FC = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/home")
    }

    return <button type="reset" onClick={handleNavigate}>Home</button>
}

export default NavigateHome