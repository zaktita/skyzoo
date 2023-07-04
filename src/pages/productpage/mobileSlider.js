import React, { useState, useRef } from 'react';

const Carousel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current;
    if (difference > 0) {
      setCurrentImage((prevImage) =>
        prevImage === images.length - 1 ? 0 : prevImage + 1
      );
    } else if (difference < 0) {
      setCurrentImage((prevImage) =>
        prevImage === 0 ? images.length - 1 : prevImage - 1
      );
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor:'pointer'
        // height: '400px',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={images[currentImage]}
        alt="carousel-image"
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
};

export default Carousel;
