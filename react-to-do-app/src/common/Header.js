import { useState } from 'react';
import McAfeeLogo from "../image/McAfee.jpg"
import './Header.css'

const Header=()=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // tiggle Menu (small device)
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
   return(
    <header className="header">
      <div className="logo"><img  className='logo_image'   ></img></div>
      <nav className="nav">
        <ul className={`nav-links ${isMenuOpen ? "show" : ""}`}>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
      <button
        className="mobile-menu-toggle"
        aria-label="Open Menu"
        onClick={toggleMenu}
      >
        ☰
      </button>
    </header>
   )
}

export default Header;