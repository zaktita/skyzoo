import React, { useEffect, useState } from 'react'
import './cartitems.css'
function CartItems(props) {
  const [imgSrc, setImgSrc] = useState(null);
  const { product , designclass} = props;

useEffect(() => {
    async function importImage() {
      const module = await import(`../assets/jimmy/${product.img}`);
      setImgSrc(module.default);
    }
    importImage();
  }, [product.img]);
  return (
    <div className='cartitems'>
        <img src={imgSrc} alt={product.title} />
      <div className='cartitems-content'>
        <div>
        <h2>{product.title}</h2>
        <h3>{product.price}</h3>
        </div>
        <div>
        <button>Remove</button>
        {/* <span>1</span>
        <button>-</button> */}
        </div>
      </div>
    </div>
  )
}

export default CartItems
