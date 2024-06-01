'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import Container from '@/app/warehouses/[warehouseId]/warehouse-container';
import { fetchBatches } from '@/fetching/warehouse';

const ProductDetailsPage = () => {
  const params = useParams();
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="">
      <Container>
        <div className="overflow-x-auto">
          <h1 className="text-center text-2xl mb-10">Product {productId} Batch Details</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Batch Name</th>
                <th>Quantity</th>
                <th>Entry Date</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
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
