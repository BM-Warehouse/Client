import React, { useEffect, useState } from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { getAllProducts } from '@/fetching/product';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Stock',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1
      }
    ]
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      if (response.status === 'success') {
        const { products } = response.data;

        const labels = products.map(({ name }) => name);
        const data = products.map(({ totalStock }) => totalStock);
        const backgroundColor = products.map(
          (_, index) =>
            `rgba(${(index * 40) % 255}, ${(index * 80) % 255}, ${(index * 120) % 255}, 0.2)`
        );
        const borderColor = products.map(
          (_, index) =>
            `rgba(${(index * 40) % 255}, ${(index * 80) % 255}, ${(index * 120) % 255}, 1)`
        );

        setChartData({
          labels,
          datasets: [
            {
              label: 'Total Stock',
              data,
              backgroundColor,
              borderColor,
              borderWidth: 1
            }
          ]
        });
      }
    };

    fetchProducts();
  }, []);

  return <Doughnut data={chartData} />;
}
