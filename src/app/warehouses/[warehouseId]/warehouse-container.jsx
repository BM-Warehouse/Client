/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { useState } from 'react';

import { useParams, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { BiPlus } from 'react-icons/bi';

import useWarehouseStore from '@/store/warehouseStore';

import { openModalAddProductToWarehouse } from './ModalAddProductToWarehouse';

const Container = ({ children }) => {
  const params = useParams();
  const { warehouseId, productId } = params;
  const path = usePathname();
  const isDetailsPage = path === `/warehouses/${warehouseId}`;
  const isProductDetailsPage =
    path === `/warehouses/${warehouseId}/warehouse-products/${productId}`;

  const [newWarehouse, setNewWarehouse] = useState({ name: '', city: '', address: '' });

  const addWarehouse = useWarehouseStore((state) => state.addWarehouse);
  const getWarehouseData = useWarehouseStore((state) => state.getWarehouseData);

  const handleAddWarehouse = async (e) => {
    e.preventDefault();
    try {
      await addWarehouse(newWarehouse);
      toast.success('Warehouse added successfully!');
      getWarehouseData(); // Refresh the warehouse data
      setNewWarehouse({ name: '', city: '', address: '' }); // Reset the form fields
      document.getElementById('add_warehouse_modal').close();
    } catch (error) {
      toast.error('Failed to add warehouse!');
    }
  };

  return (
    <div className="mx-4 mb-10 max-w-7xl md:mx-6 lg:mx-10 xl:mx-auto mt-32">
      {!isDetailsPage && !isProductDetailsPage ? (
        <div className="flex justify-between flex-wrap">
          <button
            className="inline-flex items-center border border-gray-300 bg-tertiary text-white py-2 px-4 rounded 
            shadow-sm hover:bg-secondary mb-2"
            onClick={() => document.getElementById('add_warehouse_modal').showModal()}
          >
            <BiPlus className="mr-2 text-white" /> Add Warehouse
          </button>

          <div className="search-filter flex items-center justify-between">
            <label className="input flex h-8 items-center gap-2 border-tertiary">
              <input
                type="text"
                className="grow text-sm text-tertiary transition-none placeholder:text-secondary"
                placeholder="Search product..."
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 text-tertiary opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        </div>
      ) : isDetailsPage ? (
        <div className="flex justify-between flex-wrap ">
          <button
            className="inline-flex items-center border border-gray-300 bg-tertiary text-white py-2 px-4 rounded 
            shadow-sm hover:bg-secondary mb-2"
            onClick={openModalAddProductToWarehouse}
          >
            <BiPlus className="mr-2 text-white" /> Add Products To Warehouse
          </button>
          <div className="search-filter flex items-center justify-between">
            <label className="input flex h-8 items-center gap-2 border-tertiary">
              <input
                type="text"
                className="grow text-sm text-tertiary transition-none placeholder:text-secondary"
                placeholder="Search product..."
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 text-tertiary opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        </div>
      ) : null}

      <dialog id="add_warehouse_modal" className="modal">
        <div className="modal-box bg-primary text-secondary">
          <h3 className="font-bold text-lg">Add Warehouse</h3>
          <form onSubmit={handleAddWarehouse}>
            <div className="form-control">
              <label className="label" htmlFor="name">
                Name
              </label>
              <input
                className="input input-bordered"
                type="text"
                name="name"
                value={newWarehouse.name}
                onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
                required
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="city">
                City
              </label>
              <input
                className="input input-bordered"
                type="text"
                name="city"
                value={newWarehouse.city}
                onChange={(e) => setNewWarehouse({ ...newWarehouse, city: e.target.value })}
                required
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="address">
                Address
              </label>
              <input
                className="input input-bordered"
                type="text"
                name="address"
                value={newWarehouse.address}
                onChange={(e) => setNewWarehouse({ ...newWarehouse, address: e.target.value })}
                required
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn bg-tertiary hover:bg-secondary text-white">
                Add
              </button>
              <button
                type="button"
                className="btn bg-tertiary hover:bg-secondary text-white"
                onClick={() => document.getElementById('add_warehouse_modal').close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <div className="mx-4 mb-10 max-w-7xl rounded-xl border border-secondary p-10 md:mx-6 lg:mx-10 xl:mx-auto">
        {children}
      </div>
    </div>
  );
};

export default Container;
