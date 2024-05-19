import { useEffect, useState } from 'react';

import useProductStore from '@/store/productStore';
import useWarehouseStore from '@/store/warehouseStore';

function ModalMoveStockProduct({ product, onClose, warehouseData }) {
  const { asyncMoveProductWarehouse, asyncGetDetail } = useProductStore();

  const { getWarehouseData } = useWarehouseStore();
  const [selectedOriWarehouse, setSelectedOriWarehouse] = useState('');
  const [selectedDestWarehouse, setSelectedDestWarehouse] = useState('');
  const [stock, setStock] = useState('');
  const [maxStock, setMaxStock] = useState(0);

  // console.log(warehouseData);

  useEffect(() => {
    if (selectedOriWarehouse) {
      const selectedWarehouse = warehouseData.find((war) => war.id === +selectedOriWarehouse);

      if (selectedWarehouse) {
        const productStock = selectedWarehouse.productsWarehouses.find(
          (pw) => pw.product.id === product.id
        );

        setMaxStock(productStock ? productStock.quantity : 0);
      } else {
        setMaxStock(0);
      }
    } else {
      setMaxStock(null);
    }
  }, [selectedOriWarehouse, product, warehouseData]);

  if (!product) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await asyncMoveProductWarehouse(
        product.id,
        +selectedOriWarehouse,
        +selectedDestWarehouse,
        +stock
      );
      await getWarehouseData();
      await asyncGetDetail(product.id);
      onClose();

      // console.log(product.id, +selectedOriWarehouse, +selectedDestWarehouse, +stock);
    } catch (error) {
      console.error('Error moving stock:', error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50 " />
      <div className="relative z-10 rounded-lg bg-primary p-6 w-[29rem]">
        <h3 className="text-lg font-bold text-secondary">Move Stock Product</h3>
        <form onSubmit={handleSubmit} className="input-container mt-4 text-sm">
          <div className="mb-3 flex items-center">
            <label htmlFor="name" className="w-5/12 text-secondary">
              Product name:
            </label>
            <input
              disabled
              type="text"
              defaultValue={product.name}
              name="name"
              className="input max-h-10 w-7/12 border-secondary px-4 py-0 text-sm placeholder:text-secondary"
            />
          </div>
          <div className="mb-3 flex items-center">
            <label htmlFor="warehouse" className="w-5/12 text-secondary">
              Original Warehouse:
            </label>
            <select
              name="warehouse"
              className="select max-h-10 w-7/12 border border-tertiary bg-bgColor px-4 py-0 text-sm"
              value={selectedOriWarehouse}
              onChange={(e) => setSelectedOriWarehouse(e.target.value)}
              required
            >
              <option disabled value="">
                Select Warehouse
              </option>

              {warehouseData.map((war) => (
                <option value={war.id} key={war.id}>
                  {war.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3 flex items-center">
            <label htmlFor="warehouse" className="w-5/12 text-secondary">
              Destination Warehouse:
            </label>
            <select
              name="warehouse"
              className="select max-h-10 w-7/12 border border-tertiary bg-bgColor px-4 py-0 text-sm"
              value={selectedDestWarehouse}
              onChange={(e) => setSelectedDestWarehouse(e.target.value)}
              required
            >
              <option disabled value="">
                Select Warehouse
              </option>
              {warehouseData.map((war) => (
                <option value={war.id} key={war.id}>
                  {war.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <label htmlFor="stock" className="w-5/12 text-secondary mt-3">
              Stock:
            </label>
            <div className="w-7/12">
              <input
                type="number"
                name="stock"
                className="input max-h-10 w-full border-secondary px-4 py-0 text-sm placeholder:text-secondary"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                max={maxStock || ''}
              />
              {maxStock !== null && (
                <div className="label">
                  <span className="label-text-alt">Maximum: {maxStock}</span>
                </div>
              )}
            </div>
          </div>
          <div className="container-btn-action mt-6 flex items-center justify-between">
            <button type="submit" className="btn bg-secondary text-white">
              Submit
            </button>
            <button type="button" onClick={onClose} className="btn bg-secondary text-white">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalMoveStockProduct;
