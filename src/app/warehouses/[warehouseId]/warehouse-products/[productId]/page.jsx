'use client';

import { useEffect } from 'react';

import { useParams } from 'next/navigation';

import Container from '@/components/parts/ContainerWarehouse/warehouse-container';

const ProductDetailsPage = () => {
  const params = useParams();
  const { productId } = params;

  useEffect(() => {
    if (productId) {
      // Fetch product details here
    }
  }, [productId]);

  return (
    <div className="">
      <Container>
        <div className="overflow-x-auto">
          <h1 className="text-center text-2xl mb-10">Product 1 Batch Details</h1>
          <table className="table">
            {/* head */}
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
              {/* row 1 */}
              <tr>
                <td>1</td>
                <td>Batch 1</td>
                <td>1000</td>
                <td>23-June-2024</td>
                <td>23-August-2024</td>
              </tr>
              {/* row 2 */}
              <tr>
                <td>2</td>
                <td>Batch 1</td>
                <td>1000</td>
                <td>23-June-2024</td>
                <td>23-August-2024</td>
              </tr>
              {/* row 3 */}
              <tr>
                <td>3</td>
                <td>Batch 2</td>
                <td>500</td>
                <td>23-August-2024</td>
                <td>23-October-2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetailsPage;
