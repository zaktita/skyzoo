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
        position: 'relative',
        width: '100%',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          display: 'flex',
          transform: `translateX(-${currentImage * 100}%)`,
          transition: 'transform 0.5s ease-out',
          touchAction: 'pan-y'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.filename}
            alt="carousel-image"
            style={{
              flex: '0 0 100%',
              maxWidth: '100%'
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        {images.map((_, index) => (
          <div
            key={index}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: index === currentImage ? '#000' : '#888',
              margin: '0 4px'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
