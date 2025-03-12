import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Topbar Component
 * Displays a navigation bar with a sidebar toggle button, user information, and a logout option.
 *
 * @param {Function} toggleSidebar - Function to toggle the sidebar visibility.
 * @returns {JSX.Element} The top navigation bar.
 */
const Topbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();

  /**
   * Handles user logout and redirects to the login page.
   */
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-light custom-topbar topbar mb-4 static-top shadow">
      {/* Sidebar Toggle Button (visible on small screens) */}
      <button
        className="btn btn-link d-md-none rounded-circle me-3"
        onClick={toggleSidebar}
        id="sidebarToggleTop"
        style={{ color: "#4e73df", fontSize: "24px", zIndex: 1100 }}
      >
        <i className="bi bi-list"></i>
      </button>

      {/* Topbar Navbar (User Info & Logout) */}
      <ul className="navbar-nav ms-auto">
        {/* User Info & Dropdown */}
        <li className={`nav-item dropdown no-arrow ${showUserDropdown ? "show" : ""}`}>
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
              alt="User profile"
            />
          </button>

          {/* Dropdown Menu */}
          <div
            className={`dropdown-menu dropdown-menu-end shadow animated--grow-in ${showUserDropdown ? "show" : ""}`}
          >
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

// Prop Validation to fix ESLint warning
Topbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Topbar;