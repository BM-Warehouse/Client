import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import useProductStore from '@/store/productStore';
import useWarehouseStore from '@/store/warehouseStore';
// import useWarehouseStore from '@/store/warehouseStore';

function ModalReduceStockProduct({ product, onClose, warehouseData }) {
  const { asyncReduceProduct, asyncGetAll, asyncGetDetail } = useProductStore();
  const { getWarehouseData } = useWarehouseStore();
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [stock, setStock] = useState('');
  const [maxStock, setMaxStock] = useState(0);

  useEffect(() => {
    if (selectedWarehouse) {
      const foundWarehouse = warehouseData.find((war) => war.id === +selectedWarehouse);
      if (foundWarehouse) {
        const productStock = foundWarehouse.productsWarehouses.find(
          (pw) => pw.product.id === product.id
        );
        setMaxStock(productStock ? productStock.quantity : 0);
      } else {
        setMaxStock(0);
      }
    } else {
      setMaxStock(null);
    }
  }, [selectedWarehouse, product, warehouseData]);

  if (!product) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await asyncReduceProduct(product.id, +selectedWarehouse, +stock);
      await asyncGetAll();
      await asyncGetDetail(product.id);
      await getWarehouseData();
      toast.success('Product reduced successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to reducing stock');
      console.error('Failed to reducing stock:', error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative z-10 rounded-lg bg-primary w-[29rem] p-6">
        <h3 className="text-lg font-bold text-secondary">Reduce Stock Product</h3>
        <form onSubmit={handleSubmit} className="input-container mt-4 text-sm">
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
            <label htmlFor="warehouse" className="w-5/12 text-secondary">
              Warehouse :
            </label>
            <select
              name="warehouse"
              className="select max-h-10 w-7/12 border border-tertiary bg-bgColor px-4 py-0 text-sm"
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
              required
            >
              <option disabled value="">
                Select Warehouse
              </option>

              {warehouseData &&
                warehouseData.map((war) => (
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

export default ModalReduceStockProduct;
