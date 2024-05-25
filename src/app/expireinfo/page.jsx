/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */

'use client';

import { useState, useEffect } from 'react';

import BASE_URL from '@/lib/baseUrl';
import { fetchWithToken } from '@/lib/fetchLib';

const ExpireInfoPage = () => {
  const [expireInfo, setExpireInfo] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchExp = async () => {
      try {
        const response = await fetchWithToken(`${BASE_URL}/batch/expBatch?limit=100`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setExpireInfo(data.data.batches);
      } catch (e) {
        console.error('Failed to fetch expired product', e);
      }
    };

    fetchExp();
  }, []);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative h-screen bg-bgColor font-poppins px-4 m:flex sm:justify-between sm:items-center mb-8 ml-20 mt-12">
      <h2 className="text-2xl font-bold mb-4">Expiring Products</h2>
      {expireInfo.length === 0 ? (
        <p>No expiring products available.</p>
      ) : (
        <div>
          <div onClick={handleToggle} className="p-4 border rounded shadow cursor-pointer">
            <h3 className="text-xl font-semibold">{expireInfo[0].product.name}</h3>
            <p className="text-gray-600">Batch: {expireInfo[0].batchName}</p>
            <p className="text-gray-600">Warehouse: {expireInfo[0].warehouse.name}</p>
            <p className="text-gray-600">
              Expires on: {new Date(expireInfo[0].expireDate).toLocaleDateString()}
            </p>
            <div className="text-blue-500 mt-2">{isExpanded ? 'Show Less' : 'Show More'}</div>
          </div>
          {isExpanded && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-4">More Expiring Products</h3>
              <div className="grid grid-cols-1 gap-4">
                {expireInfo.slice(1).map((batch, index) => (
                  <div key={index} className="p-4 border rounded shadow">
                    <h3 className="text-xl font-semibold">{batch.product.name}</h3>
                    <p className="text-gray-600">Batch: {batch.batchName}</p>
                    <p className="text-gray-600">Warehouse: {batch.warehouse.name}</p>
                    <p className="text-gray-600">
                      Expires on: {new Date(batch.expireDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpireInfoPage;
