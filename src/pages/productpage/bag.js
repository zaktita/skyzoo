import React from 'react'
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { Link } from 'react-router-dom';


function Bag() {
    const { cartItems } = useShoppingCart();

    return (
        <div className='col-md'>
            <h2>Shopping Bag <span>| {cartItems.length} items</span></h2>
            <div style={{ display: 'grid', placeItems: 'center', height: '200px' }}>
                <h3>You have no items in your Shopping Bag.</h3>
                <button ><Link to="/home">continue shopping</Link></button>
            </div>
        </div>
    )
}

export default Bag
