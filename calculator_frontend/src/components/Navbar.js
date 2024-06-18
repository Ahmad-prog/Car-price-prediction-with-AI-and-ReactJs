import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div>
    
      <nav className="navbar">
        <ul>
          <li><a className="active1">Home</a></li>
          <li className="dropdown">
            <a >Pages </a>
            <div className="dropdown-content">
              <a >Subpage 1</a>
              <a >Subpage 2</a>
              <a >Subpage 3</a>
            </div>
          </li>
          <li><a >Prices</a></li>
          <li><a >Blog</a></li>
          <li><a >Contact</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;