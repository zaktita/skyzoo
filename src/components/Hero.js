import React from 'react'
import './hero.css'
import Button from './button'
import CategorieCard from './categorieCard'
function Hero() {

  return (


    <div className='col-md'>
    <div className='hero-section'>
      <div className='hero-container'>
        <h6>SKYZO SHOES</h6>
        <h1>Elevate Your Style with Our Shoes</h1>
        <Button btnClass='mainBtn' link='/category/new arrivals' />
      </div>
    </div>


    <div className='heror-sub-section' >
    <CategorieCard sectionType='Sneackers' title='Sneakers' description='Stylish and Cozy' link='/category/Sneakers'/>
    <CategorieCard sectionType='Heals' title='Pumps' description='Elegant and Lightweight' link='/category/Pumps'/>
    <CategorieCard sectionType='baskets' title='Boots' description='Iconic and Flexible' link='/category/Boots'/>
    </div>
    </div>
  )
}

export default Hero
