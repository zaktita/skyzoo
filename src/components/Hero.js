import React from 'react'
import './hero.css'
import Button from './button'
import CategorieCard from './categorieCard'
function Hero() {

  const setclick = () => {
    console.log('test 67')
  };
  return (


    <div className='col-md'>
    <div className='hero-section'>
      <div className='hero-container'>
        <h6>SKYZO SHOES</h6>
        <h1>Élevez votre style avec nos chaussures</h1>
        <Button btnClass='mainBtn'  />
      </div>
    </div>


    <div className='heror-sub-section' >
    <CategorieCard sectionType='Sneackers' title='Sneackers' description='Tendance et Confort' />
    <CategorieCard sectionType='Heals' title='Heals' description='Féminité et Audace' />
    <CategorieCard sectionType='baskets' title='Baskets' description='Style et Fonctionnalité' />
    </div>
    </div>
  )
}

export default Hero
