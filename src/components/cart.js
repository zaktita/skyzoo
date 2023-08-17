import React, { useEffect, useState } from 'react'
import { CiShoppingCart } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai';

import './cart.css'
import Button from './button'
import Card from './card';
import CartItems from './cartItems';
import { useShoppingCart } from '../context/ShoppingCartContext';


function Cart() {
    const [products, setProducts] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const { cartItems, cartQuantity } = useShoppingCart();
    useEffect(() => {
        setProducts(cartItems);
    }, []);
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
        document.body.classList.toggle('cart-modal-open');
    };


    const calculateTotal = (cartItems) => {
        return cartItems.reduce((accumulator, product) => {
            return accumulator + product.totalPrice;
        }, 0);
    };
    return (
        <div>
            <button
                data-toggle="cartmodal"
                data-target="cartmodal"
                onClick={toggleModal}
            >
                <CiShoppingCart size={20}/>
                <span className="cart-count">{cartItems.length}</span>
            </button>

            {isOpen && (
                <div id="cartmodal" className="cartmodal active">
                    <div className="cartcontent">
                        <div>
                            <div className='cartheader'>
                                <h2>Shopping Bag <span>| {cartItems.length} items</span></h2>
                                <button
                                    data-dismiss="cartmodal"
                                    onClick={toggleModal}
                                >
                                    <AiOutlineClose  size={20}/>
                                </button>
                            </div>
                            <div className='cart-body'>
                                {
                                    cartItems.length > 0 ?
                                        cartItems.map((product, index) => (
                                            <CartItems key={product.item_id} product={product} designclass='cart-card' />
                                        )) :
                                        <h2>No items in cart</h2>
                                }

                            </div>
                        </div>
                        <div className='cart-footer'>
                            <div className='cart-total'>
                                <h4>Total: </h4>
                                <h4>{calculateTotal(cartItems)}</h4>

                            </div>
                            <button data-dismiss="cartmodal" onClick={toggleModal}>back to shopping</button>
                            <a href="/bag">
                                <button >Checkout</button>
                            </a>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default Cart
