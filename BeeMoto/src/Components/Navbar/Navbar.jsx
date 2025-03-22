import React, { useEffect, useState, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import menu_icon from '../../assets/menu-icon.png'
import { useLocation, useNavigate } from "react-router-dom";


const Navbar = () => {

  const nav = useNavigate();
  const location = useLocation();

  //Navigation with Scroll
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const targetPath = `/#${sectionId}`;
  
    if (location.pathname === "/") {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const yOffset = -250; // Adjust this value based on your navbar height
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    } else {
      nav(targetPath);
    }
  };
  //Set '' when not in homepage
  const [navColor, setNavColor] = useState(false);

  useEffect(()=>{
    if(location.pathname === "/"){
      window.addEventListener('scroll', ()=> {
        window.scrollY > 500 ? setNavColor(true) : setNavColor(false);
      })
    }else{
      setNavColor(true);
    }
  });

  //Mobile Menu
  const [mobileMenu, setMobileMenu] = useState(false);
  
  const menuRef = useRef();

  useEffect(() => {
    const closeMenu = e => {
      if (!menuRef.current.contains(e.target)) {
        setMobileMenu(false);
      }
    }
    document.body.addEventListener('mousedown', closeMenu);
    return() => document.body.removeEventListener('mousedown', closeMenu);
  }, [])

  return (
    <nav className={`container ${navColor? 'dark_nav' : ''}`}>
        <img src={logo} alt="" className='logo' />
        <ul className={mobileMenu?'':'hide-menu'}>
            <li><a href="/#hero" onClick={(e) => handleNavClick(e, 'hero')}>Home</a></li>
            <li><a href="/#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a></li>
            <li><a href="/#about" onClick={(e) => handleNavClick(e, 'about')}>About</a></li>
            <li><a href="/#store" onClick={(e) => handleNavClick(e, 'store')}>Gallery</a></li>
            <li className="btn"><a href="/#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact Us</a></li>
        </ul>
        <img src={menu_icon} alt="" className='menu-icon' onClick={() => setMobileMenu(!mobileMenu)}  ref={menuRef} />
    </nav>
  )
}

export default Navbar