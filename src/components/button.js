import React from 'react'
import './button.css'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function Button(props) {
  return (
    <div>
        <Link to={props.link}>
        <button className={props.btnClass} onClick={props.click}>Explore
            <AiOutlineArrowRight className='icon'/>
        </button>
        </Link>
    </div>
  )
}

export default Button
