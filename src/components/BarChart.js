import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  const evYears = data.reduce((acc, ev) => {
    acc[ev['Model Year']] = (acc[ev['Model Year']] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(evYears),
    datasets: [
      {
        label: 'Number of Electric Vehicles',
        data: Object.values(evYears),
        backgroundColor: 'rgba(54, 162, 235, 0.7)', 
        borderColor: 'rgba(54, 162, 235, 1)',      
        borderWidth: 1.5,                            
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.9)', 
        hoverBorderColor: 'rgba(54, 162, 235, 1)',      
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Model Year',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Vehicles',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
