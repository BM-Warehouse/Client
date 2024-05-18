'use client';

import { useRouter } from 'next/navigation';

import useModalStore from '@/hooks/useModalStore';
import useWarehouseStore from '@/store/warehouseStore';

const DeleteWarehouseForm = ({ id }) => {
  const router = useRouter();
  const closeModal = useModalStore((state) => state.closeModal);
  const { removeWarehouse } = useWarehouseStore((state) => ({
    removeWarehouse: state.removeWarehouse
  }));

  // useEffect(() => {
  //   if (warehouse) {
  //     setName(warehouse.name);
  //     setAddress(warehouse.address);
  //     setCity(warehouse.city);
  //   }
  // }, [warehouse]);

  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await removeWarehouse(id);
    if (response.ok) {
      router.refresh('/warehouses');
    }
    closeModal();
  };

  return (
    <div className="mt-10 flex justify-center gap-10 text-center text-xl">
      <button
        type="submit"
        className="border border-gray-200 bg-red-500 px-4 py-2 text-white"
        onClick={handleDelete}
      >
        Delete
      </button>
      <button
        type="button"
        onClick={closeModal}
        className="border border-gray-400 px-4 py-2 hover:bg-gray-200"
      >
        Cancel
      </button>
    </div>
  );
};

export default DeleteWarehouseForm;
