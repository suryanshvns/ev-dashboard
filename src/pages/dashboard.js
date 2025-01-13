import React, { useEffect, useState } from 'react';
import styles from '../app/dashboard.module.css';
import axios from 'axios';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import Loader from '../components/Loader/Loader';
import DataTableComponent from '../components/DataTableComponent';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Dashboard = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/vehicles');
        setVehicleData(response.data);
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      {loading && (
        <div className={styles.loaderOverlay}>
          <Loader />
        </div>
      )}
      <Header />
      <div className={styles.chartRow}>
        <div className={styles.chartBox}>
          <div className={styles.chartTitle}>Electric Vehicle Distribution by Make</div>
          <PieChart data={vehicleData} />
        </div>
        <div className={styles.chartBox}>
          <div className={styles.chartTitle}>Electric Vehicles by Model Year</div>
          <BarChart data={vehicleData} />
        </div>
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.chartTitle}>Table of Electric Vehicles</div>
        <DataTableComponent data={vehicleData} />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
