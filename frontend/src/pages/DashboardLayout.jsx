import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import Topbar from "../components/Dashboard/Topbar";
import Footer from "../components/Dashboard/Footer";

/**
 * DashboardLayout Component
 * Provides the main layout for dashboard pages, including the sidebar, topbar, and footer.
 * It uses the Outlet component from react-router-dom to render nested routes.
 *
 * @returns {JSX.Element} The dashboard layout.
 */
const DashboardLayout = () => {
  // Sidebar state (open by default on large screens)
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
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar toggleSidebar={toggleSidebar} />
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;