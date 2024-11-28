import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale ,PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './DataTrends.css'; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const DataTrends = () => {
  const [userTrends, setUserTrends] = useState([]);
  const [activityTrends, setActivityTrends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        const activitiesResponse = await axios.get('https://jsonplaceholder.typicode.com/todos');
        
        const userTrendData = usersResponse.data.map(user => user.id); 
        
        const activityTrendData = activitiesResponse.data
          .filter(todo => todo.completed)
          .map(todo => todo.userId); 

        const monthlyUserTrends = new Array(12).fill(0);
        const monthlyActivityTrends = new Array(12).fill(0);

        userTrendData.forEach(id => {
          const month = id % 12; 
          monthlyUserTrends[month]++;
        });

        activityTrendData.forEach(id => {
          const month = id % 12; 
          monthlyActivityTrends[month]++;
        });

        setUserTrends(monthlyUserTrends);
        setActivityTrends(monthlyActivityTrends);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const userChartData = {
    labels: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
    datasets: [
      {
        label: 'New User Registrations',
        data: userTrends,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const activityChartData = {
    labels: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
    datasets: [
      {
        label: 'User Activities',
        data: activityTrends,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="trends-chart">
      <h2 className="chart-title">Data Trends</h2>
      <div className="chart-container">
        <div className="chart-item">
          <h3>User Registrations</h3>
          <Line data={userChartData} />
        </div>
        <div className="chart-item">
          <h3>User Activities</h3>
          <Bar data={activityChartData} />
        </div>
      </div>
    </div>
  );
};

export default DataTrends;
