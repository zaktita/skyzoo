import React from 'react';
import axiosClient from './axios_client';

const PaymentButton = () => {
    const handlePayment = async () => {
        try {
            const response = await axiosClient.post('/stripe');
            window.location.href = response.data.redirectUrl;
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    return (
        <button onClick={handlePayment}>Proceed to Payment</button>
    );
};

export default PaymentButton;
