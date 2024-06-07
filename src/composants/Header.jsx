import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';
import Cookies from 'js-cookie';

function Header() {
  const token = Cookies.get('access_token');

  return (
    <header className="header">
      <h1>Mon site web</h1>
      <nav>
      {token ? (
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Profile</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/products/create">Create Product</Link></li>
          <li><Link to="/order">Order</Link></li>
        </ul> ) : (
           <ul>
           <li><Link to="/">Home</Link></li>
           <li><Link to="/login">Login</Link></li>
           <li><Link to="/signup">Sign Up</Link></li>
         </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;