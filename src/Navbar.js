import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ currentPage }) => {
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollTop = 0;

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

  return (
    <nav className={`navbar ${isVisible || currentPage === '/' ? '' : 'hidden'}`}>
      <ul className="navbar-links">
        <li><Link to="/">Agniveer</Link></li>
        <li><Link to="/upload">Upload Document</Link></li>
        <li><Link to="/view-agreements">View Agreements</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;