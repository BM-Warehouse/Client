// import React from 'react';

import RowCheckoutUser from '@/components/parts/RowCheckoutUser';

function ContainerCheckoutUser({ userCheckouts }) {
  return (
    <div className="container-products mt-4 p-4 md:ml-20">
      <div className="overflow-x-auto rounded-xl border border-secondary px-7 py-5">
        <table className="table table-zebra">
          <thead className="text-tertiary">
            <tr className="text-base">
              <th>ID</th>
              <th>Resi</th>
              <th>Total Price</th>
              <th>Address</th>
              <th>Method</th>
              <th>Courier</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="text-tertiary">
            {userCheckouts.map((checkout) => (
              <RowCheckoutUser key={checkout.id} checkout={checkout} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContainerCheckoutUser;
