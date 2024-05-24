import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

import Loading from '@/components/parts/Loading';

ChartJS.register(CategoryScale, ArcElement, LinearScale, Title, Tooltip, Legend);

const ProductChart = ({ detailProduct }) => {
  if (!detailProduct.productWarehouses) {
    return <Loading />;
  }
  const labels = detailProduct.productWarehouses.map((warehouse) => warehouse.warehouse.name);
  const datasets = detailProduct.productWarehouses.map((warehouse) => warehouse.quantity);

  const data = {
    labels,
    datasets: [
      {
        label: 'Warehouse Quantities',
        data: datasets,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#B3B3CC',
          '#5366FF'
        ],
        borderColor: '#fff',
        borderWidth: 1
      }
    ]
  };

  // Configuration options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: false,
        text: 'Warehouse Quantities'
      }
    }
  };

  return (
    <div className="w-full md:w-3/6 mx-0 my-auto mt-16">
      <div className="flex justify-center items-center mb-4 font-bold text-tertiary text-xl">
        <h5>Quantity of product in each warehouse</h5>
      </div>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ProductChart;
