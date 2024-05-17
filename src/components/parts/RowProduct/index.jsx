import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { HiOutlineTrash, HiArrowsExpand } from 'react-icons/hi';

function RowProduct({ product }) {
  if (!product) {
    return null;
  }
  return (
    <tr>
      <th>{product.id}</th>
      <td>
        <Link href={`/products/${product.id}`}>{product.name}</Link>
      </td>
      <td>{product.productCategories[0] ? product.productCategories[0].category.name : '-'}</td>
      <td>{product.totalStock}</td>
      <td>
        <div className="buttons-action flex justify-between">
          <button className="mr-2 min-w-28 rounded-md bg-tertiary py-1 text-primary hover:bg-secondary">
            <span className="flex items-center justify-center">
              <FiArrowUpRight className="mr-1" />
              Add Stock
            </span>
          </button>
          <button className="mr-2 min-w-28 rounded-md bg-tertiary py-1 text-primary hover:bg-secondary">
            <span className="flex items-center justify-center">
              <HiArrowsExpand className="mr-1" />
              Move Stock
            </span>
          </button>
          <button className="mr-2 min-w-28 rounded-md bg-tertiary py-1 text-primary hover:bg-secondary">
            <span className="flex items-center justify-center">
              <HiOutlineTrash className="mr-1" />
              Delete
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default RowProduct;
