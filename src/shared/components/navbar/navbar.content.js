import React from 'react';
import { Link } from 'react-router-dom';

import logo from 'assets/images/pokeapi.png';

const Content = () => {
  return (
    <nav
      aria-label="main navigation"
      className="navbar is-fixed-top"
      role="navigation"
    >
      <div className="container">
        <NavbarBrand />
      </div>
    </nav>
  );
};

const NavbarBrand = () => {
  return (
    <div className="navbar-brand">
      <Link className="navbar-item" to="/">
        <img src={logo} alt="Poke API" />
      </Link>
    </div>
  );
};

export default Content;
