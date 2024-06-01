'use client';

import { useEffect, useState } from 'react';

import Loading from '@/components/parts/Loading';
import RowUser from '@/components/parts/RowUser';
import useUsersStore from '@/store/userStore';

function TableUsers() {
  const { usersData, asyncGetAll } = useUsersStore((state) => ({
    usersData: state.usersData,
    asyncGetAll: state.asyncGetAll
  }));
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    asyncGetAll().then(() => {
      setLoading(false);
    });
  }, [asyncGetAll]);

  if (!usersData) {
    return <Loading />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="table-users mt-4  p-4 md:ml-20 ">
      <div className="overflow-x-auto rounded-xl border border-secondary px-7 py-5 ">
        <table className="table table-zebra">
          <thead className="text-tertiary ">
            <tr className="overflow-hidden text-center text-base">
              <th>ID</th>
              <th>Email</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Phone</th>
              <th>role</th>
              <th className="col-span-2 ">Actions</th>
            </tr>
          </thead>
          <tbody className=" text-tertiary ">
            {usersData.map((user) => (
              <RowUser key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableUsers;
