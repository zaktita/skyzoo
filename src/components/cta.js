import React from 'react'
import Button from './button'
import './cta.css'

function Cta() {
  return (
    <div className='col-md cta'>
      <div className='cta-content'>
        <h2>Step Up Your Fashion Game with Our Stylish Shoe Collection</h2>
        <h4>Experience the Fusion of Luxury and Fashion with Our Unique Shoe Selection</h4>
        <Button btnClass='secondBtn' link='/category/new arrivals'/>
      </div>
      <div className='cta-img'></div>
    </div>
  )
}

export default Cta 
