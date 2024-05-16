'use client';

import { useEffect, useState } from 'react';

import { getDetailOrder } from '@/fetching/orders';
import { getAllWarehouses } from '@/fetching/warehouse';
import formatRupiah from '@/lib/formatRupiah';

function Row({ no, productName, amount, price, warehouses }) {
  // function onDetailButtonClick() {
  //   console.log('Here', id);
  // }

  return (
    <tr>
      <td>{no || '-'}</td>
      <td>{productName || '-'}</td>
      <td>{amount || '-'}</td>
      <td>{price || '-'}</td>
      {/* <td>{warehouse || '-'}</td> */}
      <td>
        <select id="fruitSelect">
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

function ContainerOrderDetail({ checkoutId }) {
  const [data, setData] = useState(null);
  const [warehouses, setWarehouses] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getDetailOrder(checkoutId)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch detail order');
        }
        return res.json();
      })
      .then((detailOrderData) => {
        setData(detailOrderData.data.productCheckout);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error:', error);
      });

    getAllWarehouses()
      .then((res) => {
        // console.log('>>>', res.warehouses);
        setWarehouses(res);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, [checkoutId]);

  // if(data && warehouses){
  //     setLoading(false);
  // }

  if (isLoading) return <p className="ml-36">Loading...</p>;
  if (!data) return <p className="ml-36">No Detail Order</p>;

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
                no={d.productId}
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
