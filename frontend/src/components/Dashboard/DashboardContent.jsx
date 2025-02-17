// src/components/Dashboard.jsx
import React from 'react';
import AreaChart from '../Charts/AreaChart';
import DonutChart from '../Charts/DonutChart';
import StatCard from './StatCard';

const DashboardContent = () => {
  return (
    <div className="container-fluid">
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>

      {/* Content Row */}
      <div className="row">
        <StatCard
          title="Earnings (Monthly)"
          value="$40,000"
          icon="fa-calendar"
          color="primary"
        />
        <StatCard
          title="Earnings (Annual)"
          value="$215,000"
          icon="fa-dollar-sign"
          color="success"
        />
        <StatCard
          title="Tasks"
          value="50%"
          icon="fa-clipboard-list"
          color="info"
        />
        <StatCard
          title="Pending Requests"
          value="18"
          icon="fa-comments"
          color="warning"
        />
      </div>

      {/* Content Row */}
      <div className="row">
        {/* Area Chart */}
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
            </div>
            <div className="card-body">
              {/*<AreaChart />*/}
            </div>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
            </div>
            <div className="card-body">
              <DonutChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;