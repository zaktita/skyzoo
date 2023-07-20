import React from 'react'
import './checkout.css'


function Checkout() {
    return (
        <div className='checkout-container'>
            <div >

            <h2>Secure Checkout</h2>
            <h3>Your Details</h3>
            <label htmlFor="name">first name</label>
            <input type="text" id='name' placeholder='Name' />
            <label htmlFor="surname">last name</label>
            <input type="text" id='surname' placeholder='Surname' />
            <label htmlFor="address">address</label>
            <input type="text" id='address' placeholder='Address' />
            <label htmlFor="city">city</label>
            <input type="text" id='city' placeholder='City' />
            <label htmlFor="country">country</label>
            <input type="text" id='country' placeholder='Country' />
            <label htmlFor="zip">zip</label>
            <input type="text" id='zip' placeholder='Zip' />
            <label htmlFor="phone">phone</label>
            <input type="text" id='phone' placeholder='Phone' />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" />
            <div className='checkout-button'>
                <button>continue</button>

            </div>
            </div>
        </div>
    )
}

export default Checkout
