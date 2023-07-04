import React from 'react'
import './footer.css'
function Footer() {
  return (
    <div className='col-md footer'>
      <div className='Service'>
        <h2>Service client</h2>
        <a href="#h">Besoin d'aide</a>
        <a href="#h">FAQ</a>
        <a href="#h">Payement</a>
        <a href="#h">livraison</a>
        <a href="#h">retour</a>
      </div>
      <div className='contact'>
        <h2>Contactez Nous</h2>
        <h4>contact@skyzoshoes.ma</h4>
        <h4>+2125222-64545</h4>
        <h4>32 Rue Lahcen El Basri, Casablanca 20250</h4>
      </div>
      <div className='socials'>
        <h2>Suivez Nous</h2>
        <h4>Instagram</h4>
        <h4>Facebook</h4>
      </div>
      <div className='newsletter'>
        <h2>Newsletter</h2>
        <h4>Soyez les premiers à découvrir nos nouvelles arrivées</h4>
       <form action="">
        <input type="email" name="" id="" placeholder='Adresse Email'/>
        <button type="submit">OK</button>
       </form>
      </div>
    </div>
  )
}

export default Footer
