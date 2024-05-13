import { FiArrowUpRight } from 'react-icons/fi';
import { HiOutlineTrash, HiArrowsExpand } from 'react-icons/hi';

function RowProduct() {
  return (
    <tr>
      <th>1</th>
      <td>PediaComplete Vanila</td>
      <td>Food & Grocery</td>
      <td>Warehouse A</td>
      <td>1100</td>
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
