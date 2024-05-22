'use client';

import { useRouter } from 'next/navigation';
import { FiArrowUpRight } from 'react-icons/fi';
import { HiOutlineTrash } from 'react-icons/hi';

import useAuthUserStore from '@/store/authUserStore';
// import useUsersStore from '@/store/userStore';

function RowUser({ user, index }) {
  const router = useRouter();
  const { role } = useAuthUserStore();
  // const { asyncDestroyUser } = useUsersStore((state) => ({
  //   asyncDestroyUser: state.asyncDestroyUser
  // }));

  if (!role) {
    return null;
  }

  // const handleDestroy = async () => {
  //   await asyncDestroyUser(user.id);
  //   router.refresh();
  // };

  const handleEdit = () => {
    router.push(`/users/${user.id}/edit`);
  };

  const handleDetail = () => {
    router.push(`/users/${user.id}`);
  };

  return (
    <>
      <tr className="hover:underline cursor-pointer text-center">
        {/* {[
          `${index}`,
          `${user.email}`,
          `${user.username}`,
          `${user.fullName}`,
          `${user.phone}`,
          `${user.role}`
        ].map((dataUser) => (
          <td
            key={dataUser}
            onClick={() => handleDetail()}
            className="cursor-pointer hover:underline"
          >
            {dataUser}
          </td>
        ))} */}
        <td onClick={() => handleDetail()} className="cursor-pointer hover:underline">
          {index}
        </td>
        <td onClick={() => handleDetail()} className="cursor-pointer hover:underline">
          {user.email}
        </td>
        <td onClick={() => handleDetail()} className="cursor-pointer hover:underline">
          {user.username}
        </td>
        <td onClick={() => handleDetail()} className="cursor-pointer hover:underline">
          {user.fullName}
        </td>
        <td onClick={() => handleDetail()} className="cursor-pointer hover:underline">
          {user.phone}
        </td>
        <td onClick={() => handleDetail()} className="cursor-pointer hover:underline">
          {user.role}
        </td>
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
              onClick={() => document.getElementById('my_modal_1').showModal()}
            >
              <span className="flex items-center justify-center">
                <HiOutlineTrash className="mr-1" />
                Delete
              </span>
            </button>
          </div>
        </td>
      </tr>
      {/* <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-primary rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-bold mb-4">Confirm Action</h2>
          <p className="mb-4">Are you sure you want to delete this user?</p>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={() => document.getElementById('my_modal_1').close()}
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
      </dialog> */}
    </>
  );
}

export default RowUser;
