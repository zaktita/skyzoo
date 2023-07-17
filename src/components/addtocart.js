import React from 'react'
import { CiShoppingCart } from 'react-icons/ci'

function Addtocart(props) {
  return (
    <>
      <button className={props.btnClass} onClick={props.click}>Ajouter au panier
            <CiShoppingCart className='icon'/>
        </button>
    </>
  )
}

export default Addtocart
