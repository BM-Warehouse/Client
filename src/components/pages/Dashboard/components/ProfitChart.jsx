'use client';

import React, { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { getAllCheckout } from '@/fetching/checkout';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Profit Per Week'
    }
  }
};

const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const AreaChart = () => {
  const [chartData, setChartData] = useState({
    labels,
    datasets: [
      {
        fill: true,
        label: 'Profit',
        data: [],
        borderColor: '#7FB4BA',
        backgroundColor: '#F7F3CE'
      }
    ]
  });

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const response = await getAllCheckout();
      // eslint-disable-next-line prefer-destructuring
      const checkouts = response.checkouts;

      // Filter out the checkouts with status 'SENT'
      const sentCheckouts = checkouts.filter((checkout) => checkout.status === 'SENT');

      // Aggregate profits per day of the week
      const profitsPerDay = Array(7).fill(0); // Initialize an array with 7 zeros

      sentCheckouts.forEach((checkout) => {
        const dayOfWeek = new Date(checkout.updatedAt).getDay();
        profitsPerDay[dayOfWeek] += checkout.totalPrice;
      });

      // Update the chart data
      setChartData({
        labels,
        datasets: [
          {
            fill: true,
            label: 'Profit',
            data: profitsPerDay,
            borderColor: '#7FB4BA',
            backgroundColor: '#F7F3CE'
          }
        ]
      });
    };

    fetchCheckoutData();
  }, []);

  return (
    <div className="h-80 w-full">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default AreaChart;
