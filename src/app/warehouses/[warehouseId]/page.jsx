'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { HiOutlineTrash } from 'react-icons/hi';

import Container from '@/components/parts/ContainerWarehouse/warehouse-container';
import { getWarehouseDetails, fetchBatches } from '@/fetching/warehouse';

const WarehouseDetailPage = () => {
  const params = useParams();
  const { warehouseId } = params;
  const [warehouse, setWarehouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [warehouseDetails, batches] = await Promise.all([
          getWarehouseDetails(warehouseId),
          fetchBatches(warehouseId)
        ]);
        setWarehouse({ ...warehouseDetails, batches });
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (warehouseId) {
      fetchData();
    }
  }, [warehouseId]);

  const handleDeleteWarehouse = () => {
    toast.success('Deleted Successfully');
  };
  const handleEditStock = () => {
    toast.success('Edited Product Stocks Successfully');
  };
  const handleMoveProduct = () => {
    toast.success('Moved Products Successfully');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!warehouse) return <p>No warehouse details found.</p>;

  return (
    <div>
      <Container>
        <h1 className="mb-10 text-center text-2xl">{warehouse.name}</h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Batches</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {warehouse.products.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <ul>
                      {warehouse.batches
                        .filter((batch) => batch.productId === product.productId)
                        .map((batch) => (
                          <li key={batch.id}>
                            <p>Batch Name: {batch.batchName}</p>
                            <p>Created At: {new Date(batch.createdAt).toLocaleDateString()}</p>
                            <p>Expire Date: {new Date(batch.expireDate).toLocaleDateString()}</p>
                            <p>Stock: {batch.stock}</p>
                          </li>
                        ))}
                    </ul>
                  </td>
                  {/* Action Buttons and Forms */}
                  <td>
                    <div className="flex gap-4">
                      <button
                        className="bg-tertiary hover:bg-secondary px-4 py-2 text-white rounded-lg"
                        onClick={() => handleEditStock()}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <HiOutlineTrash />
                          Edit Stock
                        </span>
                      </button>
                      <button
                        className="bg-tertiary hover:bg-secondary px-4 py-2 text-white rounded-lg"
                        onClick={() => handleMoveProduct()}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <HiOutlineTrash />
                          Move Product
                        </span>
                      </button>
                      {/* Delete Warehouse */}
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                        onClick={() => handleDeleteWarehouse()}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <HiOutlineTrash />
                          Delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default WarehouseDetailPage;
