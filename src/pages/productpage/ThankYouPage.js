// ThankYouPage
import React, { useEffect } from "react";
import "./ThankYouPage.css";
import checkmarkIcon from "../../assets/check-btn.png";
import axios from "axios";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import axiosClient from "./axios_client";
// import * as config from 'config';

const ThankYouPage = () => {
  const createOrder = async (orderData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };

      const response = await axiosClient.post("/orders", orderData, {
        headers: config.headers,
      });
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedOrderData = sessionStorage.getItem("DataToSubmit");

    if (storedOrderData) {
      const orderData = JSON.parse(storedOrderData);
      // Now you have the order data from sessionStorage
      // console.log(orderData);
      createOrder(orderData);

      // Optionally, you can remove the data from sessionStorage after retrieval
      sessionStorage.removeItem("orderData");
      localStorage.clear();
    } else {
      // Handle the case when data is not found in sessionStorage
      console.log("Order data not found.");
    }
  }, []);

  return (
    <div className="thank-you-container">
      <img
        src={checkmarkIcon}
        alt="Checkmark Icon"
        className="checkmark-icon"
      />
      <h1>Thank You!</h1>
      <p>Your order has been successfully placed.</p>
      <p>
        An email confirmation has been sent to your registered email address.
      </p>
      <a href="/" className="return-link">
        Return to Home
      </a>
    </div>
  );
};

export default ThankYouPage;
