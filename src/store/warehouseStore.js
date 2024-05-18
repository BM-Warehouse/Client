import { create } from 'zustand';

import { getAllWarehouses, getWarehouseQuantities, removeWarehouse } from '@/fetching/warehouse';

const useWarehouseStore = create((set) => ({
  warehouseData: [],
  warehouseQuantities: [],

  getWarehouseData: async () => {
    try {
      const warehouses = await getAllWarehouses();
      set((_state) => ({ warehouseData: warehouses }));
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
  removeWarehouse: async (id) => {
    const removed = await removeWarehouse(id);
    set((_state) => ({
      removed
    }));
    return removed;
  }
}));

export default useWarehouseStore;
