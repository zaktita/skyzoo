import React, { useEffect, useState } from 'react'
import './cartitems.css'
import { useShoppingCart } from '../context/ShoppingCartContext';


function CartItems(props) {

  const { product , designclass , id , quantity} = props;
  const { removeFromCart } = useShoppingCart();

  const removeProduct = () => {
    const id = product.id;
    removeFromCart(id);
  }
  return (
    <div className='cartitems'>
        <img src={`http://localhost:8000/storage/${product.image.filename}`}
        alt={product.title} />
      <div className='cartitems-content'>
        <div>
        <h2>{product.title}</h2>
        <h4><span>color : </span>{product.color}</h4>
        <h4><span>size : </span>{product.size}</h4>
        <h4><span>quanity : </span>{product.quantity}</h4>


        </div>
        <div className='cartitems-content-right'>
        <h3>{product.totalPrice}</h3>
        <button onClick={removeProduct}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default CartItems
