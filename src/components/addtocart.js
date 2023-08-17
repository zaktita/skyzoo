import React, { useState } from 'react';
import './Addtocart.css'; // Assuming you save the provided CSS code as Addtocart.css

function Addtocart(props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Add success state

  const handleClick = () => {
    if (!loading && !success) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        setSuccess(true); // Set success state to true

        setTimeout(() => {
          setSuccess(false); // Reset success state
        }, 2000); // Adjust the timing for the success animation duration
      }, 2500);
    }
    props.click()
  };

  return (
    <button className={`button ${loading ? 'loading' : ''} ${success ? 'success' : ''}`} onClick={handleClick}>
      <span>Add to cart</span>
      <div className="cart">
        <svg viewBox="0 0 36 26">
          <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>
          <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
        </svg>
      </div>
    </button>
  );
}

export default Addtocart;
