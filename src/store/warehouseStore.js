import { create } from 'zustand';

import {
  getAllWarehouses,
  getWarehouseQuantities,
  addWarehouse,
  editWarehouse,
  removeWarehouse
} from '@/fetching/warehouse';

const useWarehouseStore = create((set) => ({
  warehouseData: [],
  warehouseQuantities: [],
  pagination: {
    totalPage: null,
    totalData: null,
    nextPage: null,
    prevPage: null,
    currentPage: 1,
    limit: null
  },

  getWarehouseData: async (page = 1) => {
    try {
      const warehouses = await getAllWarehouses(page);
      const { pagination } = warehouses;

      set((_state) => ({ warehouseData: warehouses.warehouses, pagination }));
    } catch (e) {
      console.error('Failed to fetch warehouses', e);
    }
  },
  getWarehouseQuantities: async () => {
    try {
      const warehouseQuantities = await getWarehouseQuantities();
      set((_state) => ({ warehouseQuantities }));
    } catch (e) {
      console.error('Failed to fetch warehouse quantities', e);
    }
  },
  editWarehouse: async (id, name, city, address) => {
    try {
      const editedWarehouse = await editWarehouse(id, name, city, address);
      set((_state) => ({
        editedWarehouse
      }));
    } catch (error) {
      console.error('Error in editing warehouse:', error);
    }
  },

  addWarehouse: async (id, name, city, address) => {
    try {
      const addedWarehouse = await addWarehouse(id, name, city, address);
      set((_state) => ({
        addedWarehouse
      }));
    } catch (error) {
      console.error('Error in editing warehouse:', error);
    }
  },

  removeWarehouse: async (id) => {
    const removed = await removeWarehouse(id);
    set((_state) => ({
      removed
    }));
    return removed;
  }
}));

export default useWarehouseStore;
