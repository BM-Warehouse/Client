import Link from 'next/link';
import toast from 'react-hot-toast';
import { FiArrowUpRight } from 'react-icons/fi';
import { HiOutlineTrash, HiArrowsExpand } from 'react-icons/hi';

import ModalConfirmation from '@/components/parts/ModalConfirmation';
import useProductStore from '@/store/productStore';

function RowProduct({ product, onOpenModal, onOpenMoveModal }) {
  const { asyncDeleteProduct } = useProductStore();

  const handleDelete = async () => {
    try {
      await asyncDeleteProduct(product.id);
      toast.success('Product removed successfully!');
    } catch (error) {
      toast.error('Failed to remove product.');
      console.error('Error deleting product:', error.message);
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
            // onClick={handleDelete}
            onClick={() =>
              document.getElementById(`modal-confirmation-delete-${product.id}`).showModal()
            }
            className="mr-2 min-w-28 rounded-md bg-ligtDanger py-1 text-primary hover:bg-danger"
          >
            <span className="flex items-center justify-center">
              <HiOutlineTrash className="mr-1" />
              Delete
            </span>
          </button>
          <ModalConfirmation
            action={handleDelete}
            message="Are you sure you want to delete this product?"
            id={`modal-confirmation-delete-${product.id}`}
          />
        </div>
      </td>
    </tr>
  );
}

export default RowProduct;
