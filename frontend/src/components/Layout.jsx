import { useState } from 'react';
import Sidebar from './Dashboard/Sidebar';
import Topbar from './Topbar/Topbar';
import Footer from './Dashboard/Footer';

const Layout = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div id="wrapper" className={sidebarToggle ? 'toggled' : ''}>
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar 
            toggleSidebar={() => setSidebarToggle(!sidebarToggle)}
          />
          <div className="container-fluid">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;