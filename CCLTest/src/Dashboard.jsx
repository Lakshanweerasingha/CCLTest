import React from 'react';
import UserStats from './UserStats';
import DataTrends from './DataTrends';
import UserActivities from './UserActivities';
import './Dashboard.css'; 

const Dashboard = () => {
  return (
    <div className='a'>
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-content">
        <div className="dashboard-section">
          <UserStats />
        </div>
        <div className="dashboard-section">
          <DataTrends />
        </div>
        <div className="dashboard-section">
          <UserActivities />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
