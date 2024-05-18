'use client';

import { useContext, useEffect, useState } from 'react';

import { DetailOrderContex } from '@/contexts/detailOrderContext';
import { getAllWarehouses } from '@/fetching/warehouse';
import formatRupiah from '@/lib/formatRupiah';
import { ButtonPrimary, ButtonStrong } from '@/components/parts/Button';
import { openModalDeleteVerification } from '@/components/pages/DetailOrder/ModalDeleteVerification';

function Row({ productId, no, productName, amount, price, warehouses }) {
  const { updateSelectedWarehouse, 
    selectedWarehouses, 
    setSelectedProduct} = useContext(DetailOrderContex);
    const product = {
      id: productId,
      name: productName
    }
  // function onDetailButtonClick() {
  //   console.log('Here', id);
  // }

  const handleDeleteButtonClick = () => {
    setSelectedProduct(product);
    openModalDeleteVerification()
  }
  const handleEditButtonClick = () => {
    setSelectedProduct(product);
    setIsModalEditQuantityOpen(true);
  }

  return (
    <tr>
      <td>{no || '-'}</td>
      <td>{productName || '-'}</td>
      <td>{amount || '-'}</td>
      <td>{price || '-'}</td>
      <td>
        <select
          className="select select-bordered h-9 min-h-9 min-w-48"
          value={selectedWarehouses[productId] || ''}
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
        <ButtonPrimary icon="edit" title="Edit Quantity" onClick={handleEditButtonClick}></ButtonPrimary>
        <ButtonStrong icon="delete" title="Delete Product" onClick={handleDeleteButtonClick}></ButtonStrong>
      </td>
    </tr>
  );
}

function ContainerOrderDetail({ checkoutId, data }) {
  const [warehouses, setWarehouses] = useState(null);

  useEffect(() => {
    getAllWarehouses()
      .then((res) => {
        // console.log('>>>', res);
        setWarehouses(res);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, [checkoutId]);

  // useEffect(()=> {
  //   console.log("===========", warehouses);
  // }, [warehouses]);

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
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContainerOrderDetail;
