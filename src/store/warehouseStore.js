import { create } from 'zustand';

import { getAllWarehouses } from '@/fetching/warehouse';

const useWarehouseStore = create((set) => ({
  warehouseData: [],
  getWarehouseData: async () => {
    try {
      const warehouses = await getAllWarehouses();
      set(() => ({ warehouseData: warehouses }));
    } catch (e) {
      console.error('Failed to fetch warehouses', e);
    }
  }
}));

export default useWarehouseStore;
