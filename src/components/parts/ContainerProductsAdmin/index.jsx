import RowProduct from '@/components/parts/RowProduct';

function ContainerProductsAdmin() {
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
            <RowProduct />
            <RowProduct />
            <RowProduct />
            <RowProduct />
            <RowProduct />
            <RowProduct />
            <RowProduct />
            <RowProduct />
            <RowProduct />
            <RowProduct />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContainerProductsAdmin;
