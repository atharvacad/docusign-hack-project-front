import React, { useEffect, useState } from 'react';
import './Footer.css';

const Footer = ({ currentPage }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className={`footer ${isVisible ? '' : 'hidden'}`}>
      <p>&copy; 2025 Agniveer. All rights reserved.</p>
    </footer>
  );
};

export default Footer;