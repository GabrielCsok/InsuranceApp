import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../../public/css/insurance.css';

const Topbar = () => {
  const { user, logout } = useAuth(); 
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  return (
    <nav className="navbar navbar-expand navbar-light custom-topbar topbar mb-4 static-top shadow">
      {/* Sidebar Toggle (Topbar) */}
      <button 
        className="btn btn-link d-md-none rounded-circle me-3" 
        id="sidebarToggleTop"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarCollapse"
        aria-controls="sidebarCollapse"
        aria-expanded="false"
      >
        <i className="bi bi-list"></i>
      </button>

      {/* Topbar Navbar */}
      <ul className="navbar-nav ms-auto">
        {/* Nav Item - User Information */}
        <li className={`nav-item dropdown no-arrow ${showUserDropdown ? 'show' : ''}`}>
          <button
            className="nav-link dropdown-toggle"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <span className="me-2 d-none d-lg-inline text-gray-600 small">
              {user ? user.name : "User"}
            </span>
            <img
              className="img-profile rounded-circle"
              src="img/undraw_profile.svg"
              alt="profile"
            />
          </button>
          {/* Dropdown - User Information */}
          <div className={`dropdown-menu dropdown-menu-end shadow animated--grow-in ${showUserDropdown ? 'show' : ''}`}>
            <button className="dropdown-item" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-2 text-gray-400"></i>
              Logout
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Topbar;