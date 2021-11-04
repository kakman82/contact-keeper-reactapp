import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth, logout } from '../../context/auth/AuthState';
import { useContact, clearContacts } from '../../context/contact/ContactState';

const Navbar = ({ title, icon }) => {
  function toggleBurgerMenu() {
    document.getElementById('navbarBasicExample').classList.toggle('is-active');
  }

  const [authState, authDispatch] = useAuth();
  const { isAuthenticated, user } = authState;

  const contactDispatch = useContact()[1];

  const onLogout = () => {
    logout(authDispatch);
    // logout sonrası state de yer alan contact arrayı temizliyoruz ki başka biri login olduğunda flash şeklinde kısa süreli de olsa mevcut contact lar sayfada görünmesin
    clearContacts(contactDispatch);
  };

  const authLinks = (
    <Fragment>
      <a href='#!' className='navbar-item'>
        Hello {user && user.name}
      </a>
      <a
        href='#!'
        className='navbar-item'
        onClick={() => {
          toggleBurgerMenu();
          onLogout();
        }}>
        <i className='fas fa-sign-out-alt mr-1' /> Logout
      </a>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link className='navbar-item' to='/register' onClick={toggleBurgerMenu}>
        Register
      </Link>
      <Link className='navbar-item' to='/login' onClick={toggleBurgerMenu}>
        Login
      </Link>
    </Fragment>
  );

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
          {isAuthenticated ? authLinks : guestLinks}
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
