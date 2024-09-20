import React from 'react';
import './dashboardPage.css';

export const Dashboard = ({ title, description, icon }) => {
  return (
    <div className="dashboard-tab">
      <div className="dashboard-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

