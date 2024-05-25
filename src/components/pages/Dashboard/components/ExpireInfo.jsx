import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import BASE_URL from '@/lib/baseUrl';
import { fetchWithToken } from '@/lib/fetchLib';

const ExpireNotification = () => {
  const [expireInfo, setExpireInfo] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchExp = async () => {
      try {
        const response = await fetchWithToken(`${BASE_URL}/batch/expBatch?limit=100000`, {
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

  const handleSeeClick = () => {
    router.push('/expireinfo');
  };

  return (
    <div className="p-4">
      <div
        role="alert"
        className={`alert shadow-lg ${
          expireInfo.length > 0 ? 'bg-danger text-white' : 'bg-green-500 text-white'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            color="bg-red-500"
          />
        </svg>
        <div>
          <h3 className="font-bold">Expiring Products!</h3>
          <div className="text-xs">You have {expireInfo.length} expiring products</div>
        </div>
        <button className="btn btn-sm" onClick={handleSeeClick}>
          See
        </button>
      </div>
    </div>
  );
};

export default ExpireNotification;
