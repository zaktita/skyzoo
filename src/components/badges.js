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
    <Badge icon={<CiLock className='icons'/>} title='Secure and Protected Payment'/>
    <Badge icon={<CiStar className='icons'/>} title='Guaranteed Superior Quality'/>
    <Badge icon={<CiDeliveryTruck className='icons'/>} title='Free Delivery for Orders Over 1000dh'/>
    <Badge icon={<AiOutlineCustomerService className='icons'/>} title='First-rate Customer Service'/>
  </div>
  
  )
}

export default Badges
