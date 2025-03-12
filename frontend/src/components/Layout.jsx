import { useState, useEffect } from "react";
import Sidebar from "./Dashboard/Sidebar";
import Topbar from "./Topbar/Topbar";
import Footer from "./Dashboard/Footer";
import PropTypes from "prop-types";
import "../../../public/css/insurance.css";

/**
 * Layout Component
 * Wraps the dashboard with a responsive sidebar, topbar, and footer.
 *
 * @param {React.ReactNode} children - The main dashboard content.
 * @returns {JSX.Element} The complete dashboard layout.
 */
const Layout = ({ children }) => {
  // Open sidebar by default on screens >= 768px, closed on smaller screens.
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  // Handle window resize and update sidebar state
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div id="wrapper" className={sidebarOpen ? "toggled" : ""}>
      <Sidebar isOpen={sidebarOpen} />
      <div id="content-wrapper">
        <Topbar toggleSidebar={toggleSidebar} />
        <div className="container-fluid main-content">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;