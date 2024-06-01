'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import Container from '@/app/warehouses/[warehouseId]/warehouse-container';
import Loading from '@/components/parts/Loading';
import { fetchBatches } from '@/fetching/warehouse';

const ProductDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { productId, warehouseId } = params;

  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const data = await fetchBatches(productId, warehouseId);
        console.log(data);
        setBatches(data.batches);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (productId && warehouseId) {
      fetchBatchDetails();
    }
  }, [productId, warehouseId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Container>
        <div className="overflow-x-auto">
          <button
            className="inline-flex items-center border border-gray-300 bg-tertiary text-white py-2 px-4 rounded 
            shadow-sm hover:bg-secondary mb-2"
            onClick={() => router.back()}
          >
            Back to Warehouse
          </button>
          <h1 className="text-center text-2xl mb-10 font-bold text-tertiary">
            Product {productId} Batch Details
          </h1>
          <table className="table table-zebra">
            <thead>
              <tr className="font-bold text-tertiary text-lg">
                <th>ID</th>
                <th>Batch Name</th>
                <th>Quantity</th>
                <th>Entry Date</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody className="text-tertiary">
              {batches.map((batch) => (
                <tr key={batch.id}>
                  <td>{batch.id}</td>
                  <td>{batch.batchName}</td>
                  <td>{batch.stock}</td>
                  <td>{new Date(batch.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(batch.expireDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetailsPage;
