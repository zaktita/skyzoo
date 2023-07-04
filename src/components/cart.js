import React, { useEffect, useState } from 'react'
import { CiShoppingCart } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai';
import productsData from "./products.json";
import './cart.css'
import Button from'./button'
import Card from './card';
import CartItems from './cartItems';

function Cart() {
    const [products, setProducts] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        setProducts(productsData);
    }, []);
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
        document.body.classList.toggle('cart-modal-open');
    };
    return (
        <div>
            <button
                data-toggle="cartmodal"
                data-target="cartmodal"
                onClick={toggleModal}
            >
                <CiShoppingCart />
                <span className="cart-count">{cartCount}</span>
            </button>

            {isOpen && (
                <div id="cartmodal" className="cartmodal active">
                    <div className="cartcontent">
                        <div className='cartheader'>
                            <h2>Shopping Bag <span>| 2 items</span></h2>
                            <button
                                data-dismiss="cartmodal"
                                onClick={toggleModal}
                            >
                                <AiOutlineClose />
                            </button>
                        </div>
                        <div className='cart-body'>
                            {products.slice(0, 2).map((product) => (
                                <CartItems key={product.id} product={product} designclass='cart-card' />
                            ))}

                        </div>
                        <div className='cart-footer'>
                            <div className='cart-total'>
                                <h4>Total: </h4>
                                <h4>1700 dh </h4>
                            </div>
                                <button>back to shopping</button>
                                <button>Checkout</button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default Cart
