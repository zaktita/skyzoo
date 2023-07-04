import React from 'react'
import './badges.css'
import {CiDeliveryTruck, CiLock, CiStar} from 'react-icons/ci'
import {AiOutlineCustomerService} from 'react-icons/ai'
export function Badge(props){
    return (
        <div className='badge'>
        {props.icon}
        <h4>{props.title}</h4>
        </div>
        )
}

function Badges() {
  return (
    <div className='col-md badges'>
      <Badge icon={<CiLock className='icons'/>} title='Paiement sécurisé et protégé'/>
      <Badge icon={<CiStar className='icons'/>} title='Qualité supérieure garantie'/>
      <Badge icon={<CiDeliveryTruck className='icons'/>} title='livraison gratuite à partir de 1000dh'/>
      <Badge icon={<AiOutlineCustomerService className='icons'/>} title='Service client de première qualité'/>

    </div>
  )
}

export default Badges
