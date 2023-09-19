import React, { useState } from 'react';
import { CiMenuBurger } from 'react-icons/ci';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import './Navbar.css'
import SearchModal from './searchbtn';
import Cart from './cart';
import { Link } from 'react-router-dom';
import Logo from './Logo';
const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='col-md'>

      <nav className="navbar">
        {menuOpen && (<div className="navbar_menu_mobile">
          <div className='navbar-header-mobile'>
            <Logo />
            <AiOutlineClose className='menu_icon' onClick={() => setMenuOpen(!menuOpen)} />
          </div>
          <nav >
            <ul>
              <li><a href="/">Home</a><MdKeyboardArrowRight /></li>
              <li><a href="/category/Sneakers">Sneakers</a><MdKeyboardArrowRight /></li>
              <li><a href="/category/Pumps">Pumps</a><MdKeyboardArrowRight /></li>
              <li><a href="/category/Sandals">Sandals</a><MdKeyboardArrowRight /></li>
              <li><a href="/category/Boots">Boots</a><MdKeyboardArrowRight /></li>

            </ul>
          </nav>
        </div>)}
        <CiMenuBurger className='menu_icon' onClick={() => setMenuOpen(!menuOpen)} />

        <div className="navbar_logo">
          <Logo />
          <nav className="navbar_menu">
            <ul>
              <li><a href="/category/Sneakers">Sneakers</a></li>
              <li><a href="/category/Pumps">Pumps</a></li>
              <li><a href="/category/Sandals">Sandals</a></li>
              <li><a href="/category/Boots">Boots</a></li>
            </ul>
          </nav>
        </div>

        <div className="navbar_icons">
          <SearchModal />
          <Cart />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
