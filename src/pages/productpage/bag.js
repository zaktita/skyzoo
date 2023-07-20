import React, { useState } from 'react'
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { Link } from 'react-router-dom';
import './bag.css'
import BagItems from '../../components/BagItems';
import paypalLogo from '../../assets/PayPal-Logo-PNG4.png'

function Bag() {
    const { cartItems, calculateTotal } = useShoppingCart();
    const [shipping, setShipping] = useState(100);
    const [discount, setDiscount] = useState(50);

    return (
        <div className='col-md'>
            <h2>Shopping Bag <span>| {cartItems.length} items</span></h2>
            {cartItems.length === 0 ?
                <div className='empty-bag-container' style={{}}>
                    <h3>You have no items in your Shopping Bag.</h3>
                    <Link
                        className='btn-backToShop'
                        to="/home">continue shopping</Link>
                </div>
                :
                <div className='bag-summary-container'>
                    <div className='bag-items-container'>
                        {cartItems.map((product, index) => (
                            <BagItems key={product.id + index} product={product} designclass='cart-card' />
                        ))}
                    </div>

                    <div className='bag-summary-container-right'>
                        <div className='bag-summary-container-right-header'>
                            <span>Order Summary </span>
                            <span> {cartItems.length} items</span>
                        </div>
                        <div className='bag-summary-container-right-body'>
                            <div className='bag-summary-container-right-header sub'>
                                <span>subtotal </span>
                                <span> {calculateTotal(cartItems)} DH</span>
                            </div>
                            <div className='bag-summary-container-right-header sub'>
                                <span>shipping </span>
                                <span> {shipping} DH</span>
                            </div>
                            <div className='bag-summary-container-right-header sub'>
                                <span>discount </span>
                                <span> {discount} %</span>
                            </div>
                        </div>

                        <div className='bag-summary-container-right-footer'>
                            <div className='bag-summary-container-right-header sub'>
                                <span>Estimated Total </span>
                                <span>{calculateTotal(cartItems)-(calculateTotal(cartItems)*discount/100) + shipping} DH</span>
                            </div>
                            <a href="https://www.paypal.com">
                                <button> <img src={paypalLogo} alt="" /></button>
                            </a>
                            <a href="/Checkout" >
                            <button className='btn-checkout'>  secure checkout</button>
                            </a>
                    </div>
                </div>
                </div>
            }
        </div >
    )
}

export default Bag
