import React, { useEffect, useState } from 'react'
import './cartitems.css'
import { useShoppingCart } from '../context/ShoppingCartContext';


function CartItems(props) {

  const { product , designclass , id , quantity, index} = props;
  const { removeFromCart } = useShoppingCart();

  const removeProduct = (id) => {
    removeFromCart(id);
  }
  return (
    <div className='cartitems'>
        <img src={product.image.filename}
        alt={product.title} />
      <div className='cartitems-content'>
        <h2>{product.title}</h2>

        <div>
        <h4><span>color : </span>{product.color}</h4>
        <h4><span>size : </span>{product.size}</h4>
        <h4><span>quanity : </span>{product.quantity}</h4>
        </div>
        
        <div className='cartitems-content-right'>
        <h3>{product.totalPrice}</h3>
        <button onClick={()=>{removeProduct(product.item_id)}}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default CartItems
