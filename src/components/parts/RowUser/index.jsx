'use client';

import { FiArrowUpRight } from 'react-icons/fi';
import { HiOutlineTrash } from 'react-icons/hi';

import { useUsersStore } from '@/store/userStore';

function RowUser({ user, index }) {
  const { asyncDestroy } = useUsersStore((state) => ({
    asyncDestroy: state.asyncDestroy
  }));

  const handleDelete = async () => {
    try {
      await asyncDestroy(user.id);
      console.log(`User with id ${user.id} deleted successfully`);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };
  return (
    <tr className="hover:underline cursor-pointer text-center">
      <td>{index}</td>
      <td>{user.email}</td>
      <td>{user.username}</td>
      <td>{user.fullName}</td>
      <td>{user.phone}</td>
      <td>{user.role}</td>
      <td>
        <div className="buttons-action flex justify-around">
          <button className="mr-2 min-w-24 rounded-md bg-tertiary py-1 text-primary hover:bg-secondary">
            <span className="flex items-center justify-center">
              <FiArrowUpRight className="mr-1" />
              Edit
            </span>
          </button>
          <button
            className="mr-2 min-w-24 rounded-md bg-tertiary py-1 text-primary hover:bg-secondary"
            onClick={handleDelete}
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

export default RowUser;
