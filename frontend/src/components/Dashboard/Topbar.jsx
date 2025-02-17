// src/components/Topbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Topbar = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Sidebar Toggle (Topbar) */}
      <button className="btn btn-link d-md-none rounded-circle mr-3" id="sidebarToggleTop">
        <i className="fa fa-bars"></i>
      </button> 

        {/* Topbar Search 
      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Search for..."
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form> */}

      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto">
        {/* Nav Item - User Information */}
        <li className={`nav-item dropdown no-arrow ${showUserDropdown ? 'show' : ''}`}>
          <button
            className="nav-link dropdown-toggle"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
            <img className="img-profile rounded-circle" src="img/undraw_profile.svg" alt="profile" />
          </button>
          {/* Dropdown - User Information */}
          <div className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${showUserDropdown ? 'show' : ''}`}>
            <NavLink className="dropdown-item" to="/profile">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Profile
            </NavLink>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item" onClick={() => console.log('Logout')}>
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Topbar;