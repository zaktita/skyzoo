import React, { useEffect, useState } from 'react'
import images from '../../assets/jimmy/ANTIBESFQYF_081101_ANGLE.jpg'
import './imageSlider.css'



function ImageSlider() {

  return (
    <div className='imageSlider'>
      <img src={images} alt="" />
      <img src={images} alt="" />
      <img src={images} alt="" />
    </div>
  )
}

export default ImageSlider
