import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserStats.css'; 

const UserStats = () => {
  const [userData, setUserData] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);
  const [locationStats, setLocationStats] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUserData(response.data);

      setActiveUsers(response.data.length);

      const locationCount = response.data.reduce((acc, user) => {
        const city = user.address.city;
        acc[city] = (acc[city] || 0) + 1;
        return acc;
      }, {});
      setLocationStats(locationCount);
    };

    fetchUserData();
  }, []);

  return (
    <div className="user-stats">
      <h2 className="stats-title">User Statistics</h2>
      <div className="stats-info">
        <p><strong>Total Users:</strong> {userData.length}</p>
        <p><strong>Active Users:</strong> {activeUsers}</p>
      </div>
      <div className="location-stats">
        <h3>Users by Location:</h3>
        <ul>
          {Object.keys(locationStats).map(city => (
            <li key={city} className="location-item">
              {city}: {locationStats[city]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserStats;
