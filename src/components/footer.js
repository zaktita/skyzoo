import React from 'react'
import './footer.css'
function Footer() {
  return (
<div className='col-md footer'>
  <div className='Service'>
    <h2>Customer Service</h2>
    <a href="#h">FAQ</a>
    <a href="#h">Payment</a>
    <a href="#h">Delivery</a>
    <a href="#h">Returns</a>
  </div>
  <div className='contact'>
    <h2>Contact Us</h2>
    <h4>contact@skyzoshoes.ma</h4>
    <h4>+2125222-64545</h4>
    <h4>32 Lahcen El Basri Street, Casablanca 20250</h4>
  </div>
  <div className='socials'>
    <h2>Follow Us</h2>
    <h4>Instagram</h4>
    <h4>Facebook</h4>
  </div>
  <div className='newsletter'>
    <h2>Newsletter</h2>
    <h4>Be the first to discover our new arrivals</h4>
    <form action="">
      <input type="email" name="" id="" placeholder='Email Address'/>
      <button type="submit">OK</button>
    </form>
  </div>
</div>

  )
}

export default Footer
