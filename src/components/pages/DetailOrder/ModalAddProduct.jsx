'use client';

import { useContext, useEffect, useState } from 'react';

import Image from 'next/image';
import toast from 'react-hot-toast';

import defaultProductImage from '@/assets/images/defaultProduct.png';
import { ButtonPrimary } from '@/components/parts/Button';
import { DetailOrderContex } from '@/contexts/detailOrderContext';
import { addProductToCheckout, getDetailOrder } from '@/fetching/orders';
import { getAllProducts } from '@/fetching/product';

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
      categoriesString += `, ${category}`;
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
            })
            .catch((e) => {
              toast.error('getDetailOrder Error', e);
            });
          // eslint-disable-next-line no-alert
          toast.success(`Success adding ${quantity} items of ${product.name} to checkout list`, {
            duration: 5000
          });
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
        <ButtonPrimary icon="add" onClick={handleAdd}>
          Add
        </ButtonPrimary>
      </th>
    </tr>
  );
};

const Table = ({ products }) => {
  return(
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
} 

const ModalAddProduct = ({ show, onClose, products }) => {
  const { setProductList } = useContext(DetailOrderContex);
  const TYPE_TIMEOUT_SEARCH = 1000;
  let tSearch = null;
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

  const handleSearchChange = (e) => {
    clearTimeout(tSearch);

    tSearch = setTimeout(() => {
      console.log(e.target.value);
      getAllProducts(1, 10, e.target.value).then((res) => {
        // console.log(">>", res);
        setProductList(res.products);
      });
    }, TYPE_TIMEOUT_SEARCH);
  };

  return (
    <div>
      <dialog className="modal" open={show}>
        <div className="modal-box h-2/3 w-4/5 max-w-full">
          <div>
            <h2 className="text-2xl font-bold">Products</h2>
            <div className="search-filter flex items-center justify-center">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search"
                  onChange={(e) => {
                    handleSearchChange(e);
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
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
