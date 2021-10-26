import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ title, icon }) => {
  function toggleBurgerMenu() {
    document.getElementById('navbarBasicExample').classList.toggle('is-active');
  }

  return (
    <nav
      className='navbar is-primary mb-6'
      role='navigation'
      aria-label='main navigation'>
      <div className='navbar-brand'>
        <Link className='navbar-item' to='/'>
          <span className='icon-text is-size-4 has-text-weight-semibold'>
            <span className='icon'>
              <i className={icon}></i>
            </span>
            <span>{title}</span>
          </span>
        </Link>

        <Link
          role='button'
          className='navbar-burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'
          to='/'
          onClick={toggleBurgerMenu}>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </Link>
      </div>

      <div id='navbarBasicExample' className='navbar-menu'>
        <div className='navbar-end'>
          <Link className='navbar-item' to='/' onClick={toggleBurgerMenu}>
            Home
          </Link>

          <Link className='navbar-item' to='/about' onClick={toggleBurgerMenu}>
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

Navbar.protoTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
