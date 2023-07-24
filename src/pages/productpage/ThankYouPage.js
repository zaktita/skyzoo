// ThankYouPage.js
import React from 'react';
import './ThankYouPage.css';
import checkmarkIcon from '../../assets/check-btn.png';

const ThankYouPage = () => {
  return (
    <div className="thank-you-container">
      <img src={checkmarkIcon} alt="Checkmark Icon" className="checkmark-icon" />
      <h1>Thank You!</h1>
      <p>Your order has been successfully placed.</p>
      <p>An email confirmation has been sent to your registered email address.</p>
      <a href="/" className="return-link">Return to Home</a>
    </div>
  );
};

export default ThankYouPage;
