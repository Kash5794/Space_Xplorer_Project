import React from 'react';
import '../css/Header.css';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header>

    <div className='logo-container'>Xpacio</div>

    <div className='menu-container'>
    <Link to='/'>Home</Link>
    <Link to='/weather'>Weather</Link>
    <Link to='/about'>About</Link>

    </div>
  
    </header>
  )
}

export default Header