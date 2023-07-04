import React from 'react'
import './button.css'
import { AiOutlineArrowRight } from 'react-icons/ai'

function Button(props) {
  return (
    <div>
        <button className={props.btnClass}>Découvrir
            <AiOutlineArrowRight className='icon'/>
        </button>
    </div>
  )
}

export default Button
