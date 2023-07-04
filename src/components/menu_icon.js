import React, { useEffect } from 'react'
import './menuicon.css'
import { AiOutlineClose} from 'react-icons/ai';

function Menu_icon() {

  return (
    <div className="navbar_menu_mobile">
        {/* <AiOutlineClose onClick={() => setMenuOpen(!menuOpen)}/> */}
        <nav >
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Products</a></li>
          <li><a href="#">About </a></li>
          <li><a href="#">Contact </a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Menu_icon
