import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  const evMakes = data.reduce((acc, ev) => {
    acc[ev.Make] = (acc[ev.Make] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(evMakes),
    datasets: [
      {
        label: 'Number of EVs',
        data: Object.values(evMakes),
        backgroundColor: [
          'rgba(78, 115, 223, 0.8)',
          'rgba(28, 200, 138, 0.8)',
          'rgba(246, 194, 62, 0.8)',
          'rgba(231, 74, 59, 0.8)',
          'rgba(133, 135, 150, 0.8)',
          'rgba(102, 16, 242, 0.8)',
          'rgba(40, 167, 69, 0.8)',
          'rgba(220, 53, 69, 0.8)',
          'rgba(255, 193, 7, 0.8)',
          'rgba(0, 123, 255, 0.8)',
        ],
        borderColor: [
          'rgba(78, 115, 223, 1)',
          'rgba(28, 200, 138, 1)',
          'rgba(246, 194, 62, 1)',
          'rgba(231, 74, 59, 1)',
          'rgba(133, 135, 150, 1)',
          'rgba(102, 16, 242, 1)',
          'rgba(40, 167, 69, 1)',
          'rgba(220, 53, 69, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(0, 123, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
      <Pie data={chartData} />
  );
};

export default PieChart;
