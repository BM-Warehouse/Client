'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FiArrowUpRight } from 'react-icons/fi';
import { HiOutlineTrash } from 'react-icons/hi';

import useUsersStore from '@/store/userStore';

function RowUser({ user }) {
  const router = useRouter();
  const { asyncDestroyUser } = useUsersStore();

  const handleDestroy = async () => {
    try {
      await asyncDestroyUser(user.id);
      toast.success('User removed successfully!');
    } catch (error) {
      toast.error('Failed to remove user.', error.message);
    }
  };

  const handleEdit = () => {
    router.push(`/users/${user.id}/edit`);
  };

  const handleDetail = () => {
    router.push(`/users/${user.id}`);
  };

  return (
    <tr className="cursor-pointer hover:underline text-center">
      <td onClick={() => handleDetail()}>{user.id}</td>
      <td onClick={() => handleDetail()}>{user.email}</td>
      <td onClick={() => handleDetail()}>{user.username}</td>
      <td onClick={() => handleDetail()}>{user.fullName}</td>
      <td onClick={() => handleDetail()}>{user.phone}</td>
      <td onClick={() => handleDetail()}>{user.role}</td>
      <td>
        <div className="buttons-action flex justify-around">
          <button
            onClick={handleEdit}
            className="mr-2 min-w-24 rounded-md bg-tertiary py-1 text-primary hover:bg-secondary"
          >
            <span className="flex items-center justify-center">
              <FiArrowUpRight className="mr-1" />
              Edit
            </span>
          </button>
          <button
            className="mr-2 min-w-24 rounded-md bg-tertiary py-1 text-primary hover:bg-secondary"
            onClick={() => document.getElementById(`my_modal_${user.id}`).showModal()}
          >
            <span className="flex items-center justify-center">
              <HiOutlineTrash className="mr-1" />
              Delete
            </span>
          </button>
          <dialog id={`my_modal_${user.id}`} className="modal">
            <div className="modal-box bg-primary rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4">Confirm Action</h2>
              <p className="mb-4">Are you sure you want to delete this user?</p>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={() => document.getElementById(`my_modal_${user.id}`).close()}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={handleDestroy}
                >
                  Delete
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </td>
    </tr>
  );
}

export default RowUser;
