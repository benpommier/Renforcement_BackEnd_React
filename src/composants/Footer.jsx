import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

function Footer() {
  return (
    <>
      <footer className="footer">
        <Link className="a" to="/about">About</Link>
        <Link className="a" to="/contact">Contact</Link>
      </footer>
    </>
  );
}

export default Footer;