import { useState } from 'react';
import Sidebar from './Dashboard/Sidebar';
import Topbar from './Topbar/Topbar';
import Footer from './Dashboard/Footer';
import PropTypes from 'prop-types';

/**
 * Layout Component
 * Wraps the main dashboard layout, including the sidebar, topbar, and footer.
 *
 * @param {React.ReactNode} children - The content to be rendered within the layout.
 * @returns {JSX.Element} The layout structure for the dashboard.
 */
const Layout = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  
  return (
    <div id="wrapper" className={sidebarToggle ? 'toggled' : ''}>
      <Sidebar isOpen={sidebarToggle}/>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar toggleSidebar={() => setSidebarToggle(!sidebarToggle)} />
          <div className="container-fluid main-content">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;