'use client';

import { useContext, useEffect, useState } from 'react';

import { openModalDeleteVerification } from '@/components/pages/DetailOrder/ModalDeleteVerification';
import { openModalEditQuantity } from '@/components/pages/DetailOrder/ModalEditQuantity';
import { ButtonPrimary, ButtonStrong } from '@/components/parts/Button';
import { DetailOrderContex } from '@/contexts/detailOrderContext';
import { getAllWarehouses } from '@/fetching/warehouse';
import formatRupiah from '@/lib/formatRupiah';

function Row({ productId, no, productName, amount, price, warehouses, selectedWarehouseId }) {
  const { updateSelectedWarehouse, selectedWarehouses, setSelectedProduct, status } =
    useContext(DetailOrderContex);
  const product = {
    id: productId,
    name: productName,
    quantity: amount
  };
  // function onDetailButtonClick() {
  //   console.log('Here', id);
  // }

  const handleDeleteButtonClick = () => {
    setSelectedProduct(product);
    openModalDeleteVerification();
  };
  const handleEditButtonClick = () => {
    setSelectedProduct(product);
    openModalEditQuantity();
  };

  // useEffect(()=>{
  //   console.log(data);
  // }, []);

  return (
    <tr>
      <td>{no || '-'}</td>
      <td>{productName || '-'}</td>
      <td>{amount || '-'}</td>
      <td>{price || '-'}</td>
      <td>
        <select
          className="select select-bordered h-9 min-h-9 min-w-48"
          disabled={!!selectedWarehouseId}
          value={selectedWarehouseId || selectedWarehouses[productId] || ''}
          id="warehouseSelect"
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
      <td>
        <ButtonPrimary
          icon="edit"
          title="Edit Quantity"
          disable={status !== 'WAIT FOR PAYMENT'}
          onClick={handleEditButtonClick}
        />
        <ButtonStrong
          icon="delete"
          title="Delete Product"
          disable={status !== 'WAIT FOR PAYMENT'}
          onClick={handleDeleteButtonClick}
        />
      </td>
    </tr>
  );
}

function ContainerOrderDetail({ checkoutId, data }) {
  const [warehouses, setWarehouses] = useState(null);

  useEffect(() => {
    getAllWarehouses(1, 10000)
      .then((res) => {
        // console.log('>>>', res);
        setWarehouses(res.warehouses);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, [checkoutId]);

  // useEffect(()=> {
  //   console.log("===========", warehouses);
  // }, [warehouses]);

  return (
    <div className="container-detail-order p-4 md:ml-20 ">
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody className=" text-tertiary">
            {data.map((d, i) => (
              <Row
                key={d.productId}
                no={i + 1}
                productId={d.productId}
                productName={d.product.name}
                amount={d.quantityItem}
                price={formatRupiah(d.productPrice)}
                warehouses={warehouses}
                selectedWarehouseId={d.warehouseId}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContainerOrderDetail;
