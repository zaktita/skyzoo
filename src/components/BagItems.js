import React from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext';
import './BagItems.css'
function BagItems({product}) {
    const { removeFromCart } = useShoppingCart();
  
    const removeProduct = () => {
      const id = product.id;
      removeFromCart(id);}

  return (
    <div className='bagitems-cointainer'>
    {/* <img src={`http://localhost:8000/storage/${product.image.filename}`} */}
    <img src={product.image.filename}
    alt={product.title} />
  <div className='bag-items'>

    <div className='bag-item-info'>
    <div className='bag-item-title'>
    <h2 >{product.title}</h2>
    <h2 className='bag-item-price'>{product.totalPrice}DH</h2>
        </div>
    <h3><span>color : </span>{product.color}</h3>
    <h3><span>size : </span>{product.size}</h3>
    <h3><span>quanity : </span>{product.quantity}</h3>
    </div>


    <div className='bag-item-remove'>
    <button  onClick={removeProduct}> <span> X</span> Remove</button>
    </div>
  </div>
</div>
  )
}

export default BagItems
