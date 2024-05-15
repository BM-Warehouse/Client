import { FiArrowUpRight } from 'react-icons/fi';
import { HiOutlineTrash } from 'react-icons/hi';

function RowUser({ user, index }) {
  return (
    <tr className="hover:underline cursor-pointer text-center">
      <td>{index}</td>
      <td>{user.email}</td>
      <td>{user.username}</td>
      <td>{user.password} A</td>
      <td>{user.fullName}</td>
      <td>{user.phone}</td>
      <td>{user.address}</td>
      <td>{user.gender}</td>
      <td>{user.birthdate} </td>
      <td>{user.avatar}</td>
      <td>{user.role}</td>
      <td>
        <div className="buttons-action flex justify-between">
          <button className="mr-2 min-w-24 rounded-md bg-tertiary py-1 text-primary hover:bg-secondary">
            <span className="flex items-center justify-center">
              <FiArrowUpRight className="mr-1" />
              Edit
            </span>
          </button>
          <button className="mr-2 min-w-24 rounded-md bg-tertiary py-1 text-primary hover:bg-secondary">
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

export default RowUser;
