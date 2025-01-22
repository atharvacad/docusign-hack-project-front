import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ currentPage }) => {
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollTop = 0;
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    if (currentPage !== '/') {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

  const isTransparent = location.pathname === '/' || location.pathname === '/upload';

  return (
    <nav className={`navbar ${isVisible || currentPage === '/' ? '' : 'hidden'} ${isTransparent ? 'transparent' : 'frosted'}`}>
      <div className="navbar-logo">
        <Link to="/">
          <img src="https://raw.githubusercontent.com/Marvin1198/BackgroubWallpapers/main/Logo.png" alt="Logo" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Agniveer</Link></li>
        <li><Link to="/upload">Upload Document</Link></li>
        <li><Link to="/view-agreements">View Agreements</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;