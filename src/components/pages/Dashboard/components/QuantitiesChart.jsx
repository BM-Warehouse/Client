import React, { useEffect, useState } from 'react';

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

import { getWarehouseName } from '@/fetching/warehouse';
import useWarehouseStore from '@/store/warehouseStore';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const QuantitiesChart = () => {
  const { warehouseQuantities, getWarehouseQuantities } = useWarehouseStore();
  const [warehouseNames, setWarehouseNames] = useState([]);

  useEffect(() => {
    const fetchWarehouseNames = async () => {
      try {
        const names = await Promise.all(
          warehouseQuantities.map(async (item) => {
            const name = await getWarehouseName(item.warehouseId);
            return name;
          })
        );
        setWarehouseNames(names);
      } catch (error) {
        console.error('Error fetching warehouse details:', error);
      }
    };

    if (warehouseQuantities.length > 0) {
      fetchWarehouseNames();
    }
  }, [warehouseQuantities]);

  useEffect(() => {
    getWarehouseQuantities();
  }, [getWarehouseQuantities]);

  // dua data untuk chart
  const data = warehouseQuantities.map((item) => item.totalQuantity);
  const labels =
    warehouseNames.length > 0
      ? warehouseNames
      : warehouseQuantities.map((item) => `Warehouse ${item.warehouseId}`);

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
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default QuantitiesChart;
