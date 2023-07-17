import React, {useState } from 'react';
import { CiSearch, CiShoppingCart , CiMenuBurger} from 'react-icons/ci';
import { AiOutlineClose} from 'react-icons/ai';
import logo from '../assets/logo.webp'
import './Navbar.css'
import Menu_icon from './menu_icon';
import SearchModal from './searchbtn';
import Cart from './cart';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className='col-md'>

    <nav className="navbar">
    {menuOpen && (<div className="navbar_menu_mobile">
        <AiOutlineClose className='menu_icon' onClick={() => setMenuOpen(!menuOpen)}/>
        <nav >
        <ul>
  <li><Link to="/Home">Home</Link></li>
  <li><Link to="/Product">Products</Link></li>
  <li><Link to="/Categorie">About</Link></li>
  <li><a href="#">Contact</a></li>
</ul>
      </nav>
    </div>)}
    <CiMenuBurger className='menu_icon' onClick={() => setMenuOpen(!menuOpen)} />

      <div className="navbar_logo">
        <img src={logo} alt="skyzo shoes logo" />
      <nav className="navbar_menu">
      <ul>
  <li><Link to="/home">Home</Link></li>
  <li><a href="/category/Women's Sneakers">Sneakers</a></li>
  <li><a href="/category/Heals">Heals</a></li>
  <li><a href="/category/shoes">shoes</a></li>

</ul>
      </nav>
      </div>
      
      <div className="navbar_icons">
          <SearchModal/>
          <Cart/>
      </div>
    </nav>
          </div>
  );
};

export default Navbar;
