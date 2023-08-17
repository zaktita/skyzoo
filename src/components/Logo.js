import React from 'react'
import logo from '../assets/logo.webp'
import { Link } from 'react-router-dom'


function Logo() {
  return (
    <Link to='/'>
        <img src={logo} style={{width: '70px'}} alt="logo" /> 
    </Link>
  )
}

export default Logo
