import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";
import SidebarItem from "./SidebarItem";
import logo from "../../../public/img/logo.png";

/**
 * Sidebar Component
 * Renders a navigation sidebar with links based on the user's role.
 *
 * @param {boolean} isOpen - Controls whether the sidebar is visible.
 * @returns {JSX.Element} The sidebar component.
 */
const Sidebar = ({ isOpen }) => {
  const { user } = useAuth();

  // Define navigation items based on user roles
  const navItems = [
    {
      type: "item",
      icon: "bi-briefcase-fill",
      text: "Dashboard",
      path: "/dashboard",
      roles: ["admin", "user"],
    },
    {
      type: "item",
      icon: "bi-person-circle",
      text: "Profile",
      path: "/dashboard/profile",
      roles: ["admin", "user"],
    },
    {
      type: "collapse",
      icon: "bi-shield-lock",
      text: "Insurance",
      roles: ["admin"],
      subItems: [
        { text: "Users", path: "/dashboard/users" },
        { text: "Insurances", path: "/dashboard/insurances" },
      ],
    },
    {
      type: "collapse",
      icon: "bi-shield-lock",
      text: "Insurance",
      roles: ["user"],
      subItems: [
        { text: "File for new insurance", path: "/dashboard/new-insurance" },
        { text: "My Insurances", path: "/dashboard/my-insurances" },
      ],
    },
  ];

  return (
    <div
      id="sidebar"
      className={`sidebar bg-dark text-white ${isOpen ? "show" : "hide"}`}
    >
      <ul className="navbar-nav">
        {/* Sidebar Branding (Logo + Title) */}
        <div className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-icon">
            <img src={logo} alt="Insurance Logo" className="sidebar-logo" />
          </div>
          <div className="sidebar-brand-text mx-3">Evergreen Insurance</div>
        </div>

        <hr className="sidebar-divider" />

        {/* Render Sidebar Items based on User Role */}
        {navItems.map(
          (item) =>
            item.roles.includes(user.role.toLowerCase()) && (
              <SidebarItem key={item.text} item={item} />
            )
        )}
      </ul>
    </div>
  );
};

// Prop Validation to fix ESLint warning
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default Sidebar;