'use client';

import { useContext, useEffect, useState } from 'react';

import Image from 'next/image';

import defaultProductImage from '@/assets/images/defaultProduct.png';
import { DetailOrderContex } from '@/contexts/detailOrderContext';
import { addProductToCheckout, getDetailOrder } from '@/fetching/orders';

const generateCategoriesString = (product) => {
  let categoriesString = '';
  // get categories list
  const categoryList = product.productCategories.map((pc) => pc.category.name);
  // console.log(categoryList);

  // eslint-disable-next-line no-restricted-syntax
  for (const category of categoryList) {
    if (categoriesString === '') {
      categoriesString += category;
    } else {
      categoriesString += `, ${  category}`;
    }
  }

  return categoriesString;
};

const Row = ({ product }) => {
  const [quantity, setQuantity] = useState(0);
  const { currentCheckoutId, setData, page } = useContext(DetailOrderContex);

  const handleQuantity = (event) => {
    setQuantity(Math.max(0, event.target.value));
  };
  const handleAdd = () => {
    if (quantity) {
      addProductToCheckout(currentCheckoutId, product.id, quantity)
        .then(() => {
          getDetailOrder(currentCheckoutId, page)
            .then((res) => res.json())
            .then((res) => {
              setData(res.data.checkout.productCheckout);
            });
            // eslint-disable-next-line no-alert
            window.alert(
              `Success adding ${quantity} items of ${product.name}(${product.id}) to checkout id ${currentCheckoutId} to checkout list`
            );
            // window.alert(JSON.stringify(res, null, 2));
          })
          .catch((e) => {
          // eslint-disable-next-line no-alert
          window.alert('Error', e);
        });
    }
  };

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <Image
                src={product?.imageUrl || defaultProductImage}
                alt="Avatar Tailwind CSS Component"
                width={50}
                height={50}
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{product?.name}</div>
          </div>
        </div>
      </td>
      <td>{generateCategoriesString(product)}</td>
      <td>
        <input
          type="number"
          placeholder="0"
          className="input input-bordered w-16 max-w-xs"
          value={quantity}
          onChange={(e) => {
            handleQuantity(e);
          }}
        />
      </td>
      <th>
        <button className="btn btn-primary btn-md" onClick={handleAdd}>
          Add
        </button>
      </th>
    </tr>
  );
};

const Table = ({ products }) => (
  <div className="overflow-x-auto">
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Categories</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((p) => (
          <Row key={p.id} product={p} />
          ))}
      </tbody>
    </table>
  </div>
  );

const ModalAddProduct = ({ show, onClose, products }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      // Ini diakses saat kompoinen dihapus, ketika Modal dihapus listenernya juga butuh di hapus
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div>
      <dialog className="modal" open={show}>
        <div className="modal-box h-2/3 w-4/5 max-w-full">
          <div>
            <h2 className="text-2xl font-bold">Products</h2>
            <Table products={products} />
            <div className="modal-action">
              <button className="btn" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ModalAddProduct;
