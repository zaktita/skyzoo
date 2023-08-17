import React, { useState } from 'react'
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { Link } from 'react-router-dom';
import './bag.css'
import BagItems from '../../components/BagItems';
import paypalLogo from '../../assets/PayPal-Logo-PNG4.png'
import axios from 'axios';

function Bag() {
    const { cartItems, calculateTotal } = useShoppingCart();
    const [shipping, setShipping] = useState(100);
    const [discount, setDiscount] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    const [error, setError] = useState(false);
    const handleDiscount = async () => {
        console.log(discountCode);
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            };
            const response = await axios.post(`http://127.0.0.1:8000/api/coupon/${discountCode}`, { headers: config.headers });
            setDiscount(response.data.coupon);
            console.log(response.data.coupon);

        } catch (error) {
            // console.log(error);
            setDiscount(0)
            setError(error.response.data.message);
        }
    }


    const handleCheckout =  () => {
        localStorage.setItem('discount', JSON.stringify(discount));
    }
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
                            <BagItems key={product.item_id} product={product} designclass='cart-card' />
                        ))}

                    </div>


                    <div className='bag-summary-container-right'>
                        <div className='bag-summary-container-right-header'>
                            <span>Order Summary </span>
                            <span> {cartItems.length} items</span>
                        </div>
                        {error && <h5 className='error' style={{ color: 'red', margin: '0' }} >{error}</h5>}
                        <div className='disount-container'>
                            <input type="text" placeholder='enter your discount code' onChange={(e) => setDiscountCode(e.target.value)} />
                            <button type="submit" onClick={handleDiscount}>apply</button>
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
                                <span>{calculateTotal(cartItems) - (calculateTotal(cartItems) * discount / 100) + shipping} DH</span>
                            </div>
                            <a href="https://www.paypal.com">
                                <button> <img src={paypalLogo} alt="" /></button>
                            </a>
                            <a href="/Checkout" onClick={handleCheckout} >
                                <button className='btn-checkout'>secure checkout</button>
                            </a>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default Bag
