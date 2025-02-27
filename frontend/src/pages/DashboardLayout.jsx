import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';
import Topbar from '../components/Dashboard/Topbar';
import Footer from '../components/Dashboard/Footer';

const DashboardLayout = () => {
  return (
    <div id="wrapper">
      <Sidebar />
      
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar />
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