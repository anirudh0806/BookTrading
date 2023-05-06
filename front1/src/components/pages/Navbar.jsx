import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
//import { useSelector } from 'react-redux'
import Cookies from 'universal-cookie';

const Navbar = () => {
  const history = useHistory();
  const cookies = new Cookies();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          <b>Book Trading Platform</b>{' '}
        </NavLink>
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home{' '}
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                Library
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/find">
                Explore
              </NavLink>
            </li>
          </ul>
          <div className="buttons text-center">
            <NavLink to="/cart" className="btn btn-outline-dark m-2">
              <i className="fa fa-shopping-cart"></i> Cart{' '}
            </NavLink>
            <button
              value="Sign Out"
              onClick={(e) => {
                e.preventDefault();
                cookies.remove('email');
                history.push('/login');
              }}
              className="btn btn-outline-dark m-2">
              Sign Out
            </button>
          </div>
          <div>Signed in as: {cookies.get('email')}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;