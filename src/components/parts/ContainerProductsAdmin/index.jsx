import { useEffect } from 'react';

import RowProduct from '@/components/parts/RowProduct';
import useProductStore from '@/store/productStore';

function ContainerProductsAdmin() {
  const { productsData, asyncGetAll } = useProductStore();

  useEffect(() => {
    asyncGetAll();
  }, [asyncGetAll]);

  if (!productsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-products mt-4  p-4 md:ml-20 ">
      <div className="overflow-x-auto rounded-xl border border-secondary px-7 py-5 ">
        <table className="table table-zebra ">
          {/* head */}
          <thead className="text-tertiary">
            <tr className="text-base ">
              <th>No</th>
              <th>Name</th>
              <th>Category</th>
              <th>Warehouse</th>
              <th>Total Stock</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody className=" text-tertiary">
            {productsData.map((product, index) => (
              <RowProduct key={product.id} product={product} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContainerProductsAdmin;
