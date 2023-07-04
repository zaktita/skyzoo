import React from 'react'
import Button from './button'
import './cta.css'

function Cta() {
  return (
    <div className='col-md cta'>
      <div className='cta-content'>
        <h2>Des chaussures parfaites pour chaque occasion</h2>
        <h4>Nos chaussures allient confort, qualité et style. </h4>
        <Button btnClass='secondBtn'/>
      </div>
      <div className='cta-img'></div>
    </div>
  )
}

export default Cta 
