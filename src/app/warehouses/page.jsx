'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import toast from 'react-hot-toast';
import { FiArrowUpRight } from 'react-icons/fi';
import { HiOutlineTrash } from 'react-icons/hi';

import Container from '@/components/parts/ContainerWarehouse/warehouse-container';
import Pagination from '@/components/parts/Pagination';
import useWarehouseStore from '@/store/warehouseStore';

const WarehousesPage = () => {
  const { warehouseData, getWarehouseData, editWarehouse, removeWarehouse, pagination } =
    useWarehouseStore((state) => ({
      warehouseData: state.warehouseData,
      getWarehouseData: state.getWarehouseData,
      editWarehouse: state.editWarehouse,
      removeWarehouse: state.removeWarehouse,
      pagination: state.pagination
    }));

  const onPaginationClick = async (page) => {
    await getWarehouseData(page);
  };

  useEffect(() => {
    getWarehouseData();
  }, [getWarehouseData]);

  const openModal = (id) => {
    document.getElementById(id).showModal();
  };

  const closeModal = (id) => {
    document.getElementById(id).close();
  };

  const handleEditWarehouse = async (modalId, id, name, city, address) => {
    try {
      await editWarehouse(id, name, city, address);
      toast.success('Warehouse updated successfully!');
      getWarehouseData(); // Refresh the warehouse data
    } catch (error) {
      toast.error('Failed to update warehouse!');
    }
    closeModal(modalId);
  };

  const handleDeleteWarehouse = async (id) => {
    try {
      await removeWarehouse(id);
      toast.success('Warehouse deleted!');
      getWarehouseData(); // Refresh warehouse data after deleting
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div>
      <Container>
        <h1 className="mb-10 text-center text-2xl">Warehouses</h1>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Warehouse Name</th>
                <th>City</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {warehouseData.map((warehouse) => (
                <tr key={warehouse.id}>
                  <th>{warehouse.id}</th>
                  <td>
                    <Link href={`/warehouses/${warehouse.id}`} className="cursor-pointer">
                      {warehouse.name}
                    </Link>
                  </td>
                  <td>{warehouse.city}</td>
                  <td>{warehouse.address}</td>
                  <td>
                    <div className="flex items-center gap-4">
                      {/* Edit Warehouse Form */}
                      <button
                        className="bg-tertiary hover:bg-secondary px-4 py-2 text-white rounded-lg"
                        onClick={() => openModal(`edit_modal_${warehouse.id}`)}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <FiArrowUpRight />
                          Edit
                        </span>
                      </button>
                      <dialog id={`edit_modal_${warehouse.id}`} className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Edit {warehouse.name}</h3>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              const name = e.target.name.value;
                              const city = e.target.city.value;
                              const address = e.target.address.value;
                              handleEditWarehouse(
                                `edit_modal_${warehouse.id}`,
                                warehouse.id,
                                name,
                                city,
                                address
                              );
                            }}
                          >
                            <div className="form-control">
                              <label className="label" htmlFor="name">
                                Name
                              </label>
                              <input
                                className="input input-bordered"
                                type="text"
                                name="name"
                                defaultValue={warehouse.name}
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
                                defaultValue={warehouse.city}
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
                                defaultValue={warehouse.address}
                              />
                            </div>
                            <div className="modal-action">
                              <button type="submit" className="btn">
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn"
                                onClick={() => closeModal(`edit_modal_${warehouse.id}`)}
                              >
                                Close
                              </button>
                            </div>
                          </form>
                        </div>
                      </dialog>

                      {/* Delete Warehouse */}
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                        onClick={() => handleDeleteWarehouse(warehouse.id)}
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
      <Pagination
        currentPage={pagination.currentPage}
        totalPage={pagination.totalPage}
        onClick={onPaginationClick}
      />
    </div>
  );
};

export default WarehousesPage;
