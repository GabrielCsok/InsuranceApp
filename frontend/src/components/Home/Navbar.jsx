import React from "react";
import { Link } from "react-router-dom";
import logo from '../../../public/img/logo.png';

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
  <div className="container px-5">
    <div className="sidebar-brand-icon">
      <img src={logo} alt="Insurance Logo" className="sidebar-logo" />
    </div>
    <a className="navbar-brand" href="#page-top">Evergreen Insurance</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button>
    <div className="collapse navbar-collapse" id="navbarResponsive">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item"><Link className="nav-link" to="/register">Sign Up</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/login">Log In</Link></li>
      </ul>
    </div>
  </div>
</nav>

);

export default Navbar;