import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
    const [orderData, setOrderData] = useState({}); // Initialize with an empty object

    const setDataToSubmit = (formData) => {
        setOrderData(formData);
    };

    return (
        <OrderContext.Provider value={{ orderData, setDataToSubmit }}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderProvider;
export const useOrderContext = () => useContext(OrderContext);
