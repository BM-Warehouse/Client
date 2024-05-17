import { create } from 'zustand';

import { getAllWarehouses, getWarehouseQuantities } from '@/fetching/warehouse';

const useWarehouseStore = create((set) => ({
  warehouseData: [],
  warehouseQuantities: [],

  getWarehouseData: async () => {
    try {
      const warehouses = await getAllWarehouses();
      set(() => ({ warehouseData: warehouses }));
    } catch (e) {
      console.error('Failed to fetch warehouses', e);
    }
  },
  getWarehouseQuantities: async () => {
    try {
      const warehouseQuantities = await getWarehouseQuantities();
      set(() => ({ warehouseQuantities }));
    } catch (e) {
      console.error('Failed to fetch warehouse quantities', e);
    }
  }
}));

export default useWarehouseStore;
