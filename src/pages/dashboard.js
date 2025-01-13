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
  const [page, setPage] = useState(1);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [limit] = useState(1000); // Fixed limit per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/vehicles?page=${page}&limit=${limit}`);
        setVehicleData((prevData) => [...prevData, ...response.data.vehicles]);
        setTotalVehicles(response.data.totalVehicles); // Set the total vehicle count for pagination
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  // Handle "Load More" button click
  const loadMoreData = () => {
    if (vehicleData.length < totalVehicles) {
      setPage((prevPage) => prevPage + 1);
    }
  };

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
        {vehicleData.length < totalVehicles && (
          <div className={styles.loadMoreButtonContainer}>
            <button onClick={loadMoreData} className={styles.loadMoreButton}>
              Load More
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
