/* eslint-disable no-alert */
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { HiOutlineTrash, HiArrowsExpand } from 'react-icons/hi';

import useProductStore from '@/store/productStore';

function RowProduct({ product, onOpenModal, onOpenMoveModal }) {
  const { asyncDeleteProduct } = useProductStore();

  const handleDelete = async () => {
    try {
      await asyncDeleteProduct(product.id);
      alert('Product removed successfully!');
    } catch (error) {
      console.error('Error deleting product:', error.message);
      alert('Failed to remove product.');
    }
  };

  const handleAddStock = () => {
    onOpenModal(product);
  };

  const handleMoveStock = () => {
    onOpenMoveModal(product);
  };

  if (!product || !product.productCategories) {
    return null;
  }

  return (
    <tr>
      <th>{product.id}</th>
      <td>
        <Link href={`/products/${product.id}`}>{product.name}</Link>
      </td>
      <td>
        {product.productCategories[0] && product.productCategories[0]
          ? product.productCategories[0].category.name
          : '-'}
      </td>
      <td>{product.totalStock}</td>
      <td>
        <div className="buttons-action flex justify-between">
          <button
            onClick={handleAddStock}
            className="mr-2 min-w-28 rounded-md bg-tertiary py-1 text-primary hover:bg-secondary"
          >
            <span className="flex items-center justify-center">
              <FiArrowUpRight className="mr-1" />
              Add Stock
            </span>
          </button>
          <button
            onClick={handleMoveStock}
            className="mr-2 min-w-28 rounded-md bg-tertiary py-1 text-primary hover:bg-secondary"
          >
            <span className="flex items-center justify-center">
              <HiArrowsExpand className="mr-1" />
              Move Stock
            </span>
          </button>
          <button
            onClick={handleDelete}
            className="mr-2 min-w-28 rounded-md bg-tertiary py-1 text-primary hover:bg-secondary"
          >
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
