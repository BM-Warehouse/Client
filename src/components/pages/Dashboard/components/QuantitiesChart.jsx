import React, { useEffect } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import useWarehouseStore from '@/store/warehouseStore';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const QuantitiesChart = () => {
  const { warehouseQuantities, getWarehouseQuantities } = useWarehouseStore();

  useEffect(() => {
    getWarehouseQuantities();
  }, [getWarehouseQuantities]);

  const labels = warehouseQuantities.map((item) => `Warehouse ${item.warehouseId}`);
  const data = warehouseQuantities.map((item) => item.totalQuantity);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Quantity',
        data,
        backgroundColor: '#F7F3CE',
        borderColor: '#7FB4BA',
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Warehouse Quantities'
      }
    }
  };

  return (
    <div className="h-96 w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default QuantitiesChart;
