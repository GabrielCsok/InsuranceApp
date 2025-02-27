import React, { useState, useEffect } from 'react';
import DonutChart from '../Charts/DonutChart';
import StatCard from './StatCard';
import { apiGet } from '../../utils/api';

const DashboardContent = () => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const data = await apiGet('/dashboard');
        setDashboardStats(data);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  // Fallback values in case data hasn't loaded yet
  const totalInsurances = dashboardStats ? dashboardStats.totalInsurances : 0;
  const pending = dashboardStats ? dashboardStats.pending : 0;
  const approved = dashboardStats ? dashboardStats.approved : 0;
  const denied = dashboardStats ? dashboardStats.denied : 0;

  // Prepare data for the DonutChart
  const donutData = dashboardStats
    ? {
        labels: ['Personal', 'House', 'Car'],
        datasets: [
          {
            data: [
              dashboardStats.personal,
              dashboardStats.house,
              dashboardStats.car
            ],
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
            hoverBorderColor: 'rgba(234, 236, 244, 1)',
          },
        ],
      }
    : null;

  if (loading) {
    return <div className="container-fluid">Loading dashboard...</div>;
  }

  return (
    <div className="container-fluid">
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>

      {/* Stat Cards Row */}
      <div className="row">
        <StatCard
          title="Total Insurances"
          value={totalInsurances}
          icon="fa-clipboard-list"
          color="primary"
        />
        <StatCard
          title="Pending Insurances"
          value={pending}
          icon="fa-hourglass-half"
          color="warning"
        />
        <StatCard
          title="Approved Insurances"
          value={approved}
          icon="fa-check"
          color="success"
        />
        <StatCard
          title="Denied Insurances"
          value={denied}
          icon="fa-times"
          color="danger"
        />
      </div>

      {/* Charts Row */}
      <div className="row">
        {/* Donut Chart Column */}
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 custom-card-header">
              <h6 className="m-0 font-weight-bold custom-card-header">Insurance Types</h6>
            </div>
            <div className="card-body">
              {donutData ? (
                <DonutChart chartData={donutData} />
              ) : (
                <div>Loading chart...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;