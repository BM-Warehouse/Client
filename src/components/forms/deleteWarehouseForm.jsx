'use client';

import useModalStore from '@/hooks/useModalStore';

const DeleteWarehouseForm = () => {
  const closeModal = useModalStore((state) => state.closeModal);

  // useEffect(() => {
  //   if (warehouse) {
  //     setName(warehouse.name);
  //     setAddress(warehouse.address);
  //     setCity(warehouse.city);
  //   }
  // }, [warehouse]);

  const handleDelete = (e) => {
    e.preventDefault();
    console.log('Deleted Succesfully!');
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
