'use client';

import { useContext, useEffect, useState } from 'react';

import { getAllWarehouses } from '@/fetching/warehouse';
import formatRupiah from '@/lib/formatRupiah';
import { DetailOrderContex } from '@/contexts/detailOrderContext';

function Row({ productId, productName, amount, price, warehouses, onWarehouseChange }) {
  const { updateSelectedWarehouse, selectedWarehouses } = useContext(DetailOrderContex);
  // function onDetailButtonClick() {
  //   console.log('Here', id);
  // }

  return (
    <tr>
      <td>{productId || '-'}</td>
      <td>{productName || '-'}</td>
      <td>{amount || '-'}</td>
      <td>{price || '-'}</td>
      {/* <td>{warehouse || '-'}</td> */}
      <td>
        <select
          value={selectedWarehouses[productId] || ""}
          id="fruitSelect"
          onChange={(e) => {
            updateSelectedWarehouse(productId, e.target.value);
          }}
        >
          <option value="-1"> - </option>
          {warehouses?.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
}

function ContainerOrderDetail({ checkoutId, data }) {
  const [warehouses, setWarehouses] = useState(null);

  useEffect(() => {
    getAllWarehouses()
      .then((res) => {
        // console.log('>>>', res.warehouses);
        setWarehouses(res);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, [checkoutId]);

  return (
    <div className="container-detail-order mt-4  p-4 md:ml-20 ">
      <div className="overflow-x-auto rounded-xl border border-secondary px-7 py-5 ">
        <table className="table table-zebra ">
          {/* head */}
          <thead className="text-tertiary">
            <tr className="text-base ">
              <th>No</th>
              <th>Product Name</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Warehouse</th>
            </tr>
          </thead>
          <tbody className=" text-tertiary">
            {data.map((d) => (
              <Row
                key={d.productId}
                productId={d.productId}
                productName={d.product.name}
                amount={d.quantityItem}
                price={formatRupiah(d.productPrice)}
                warehouses={warehouses?.warehouses}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContainerOrderDetail;
