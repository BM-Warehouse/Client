'use client';

import { useState, useEffect } from 'react';

import useModalStore from '@/hooks/useModalStore';

const EditWarehouseForm = ({ warehouse, onSave }) => {
  const closeModal = useModalStore((state) => state.closeModal);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    if (warehouse) {
      setName(warehouse.name);
      setAddress(warehouse.address);
      setCity(warehouse.city);
    }
  }, [warehouse]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...warehouse, name, address, city });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="my-4 ml-4 border px-4 py-2"
          />
        </label>
      </div>
      <div>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="my-4 ml-4 border px-4 py-2"
          />
        </label>
      </div>
      <div>
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="my-4 ml-4 border px-4 py-2"
          />
        </label>
      </div>
      <div className="flex justify-center gap-10 text-center text-xl">
        <button type="submit" className="border border-gray-200 bg-secondary px-4 py-2 text-white">
          Save
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="border border-gray-400 px-4 py-2 hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditWarehouseForm;
