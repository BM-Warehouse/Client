import { useEffect } from 'react';

import useWarehouseStore from '@/store/warehouseStore';

function ModalAddStockProduct({ product, onClose }) {
  const { warehouseData, getWarehouseData } = useWarehouseStore();

  useEffect(() => {
    getWarehouseData();
  }, [getWarehouseData]);

  if (!product) {
    return null;
  }

  console.log(warehouseData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative z-10 rounded-lg bg-primary p-6">
        <h3 className="text-lg font-bold text-secondary">Add Stock Product</h3>
        <div className="input-container mt-4 text-sm">
          <div className="mb-3 flex items-center">
            <label htmlFor="name" className="w-5/12 text-secondary">
              Product name :
            </label>
            <input
              disabled
              type="text"
              defaultValue={product.name}
              name="name"
              className="input max-h-10 w-7/12 border-secondary  px-4 py-0 text-sm placeholder:text-secondary"
            />
          </div>
          <div className="mb-3 flex  items-center ">
            <label htmlFor="name" className="w-5/12 text-secondary">
              Warehouse :
            </label>
            <select className="select max-h-10 w-7/12 border border-tertiary  bg-bgColor px-4 py-0 text-sm">
              <option disabled selected>
                Select Warehouse
              </option>
              {warehouseData.map((war) => (
                <option value={war.id} key={war.id}>
                  {war.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label htmlFor="stock" className="w-5/12 text-secondary">
              Stock:
            </label>
            <input
              type="number"
              name="stock"
              className="input max-h-10 w-7/12 border-secondary px-4  py-0  text-sm placeholder:text-secondary"
            />
          </div>
        </div>
        <div className="container-btn-action mt-6 flex items-center justify-between">
          <button type="submit" className="btn bg-secondary text-white">
            Submit
          </button>
          <button onClick={onClose} className="btn bg-secondary text-white">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddStockProduct;
