import Link from 'next/link';
import { CgChevronRight } from 'react-icons/cg';

import formatRupiah from '@/lib/formatRupiah';

function RowOrder({ id, userName, noResi, totalPrice, status, date }) {
  // function onDetailButtonClick() {
  //   console.log('Here', id);
  // }

  return (
    <tr>
      <td>{id || '-'}</td>
      <td>{userName || '-'}</td>
      <td>{noResi || '-'}</td>
      <td>{date || '-'}</td>
      <td>{totalPrice || '-'}</td>
      <td>{status || '-'}</td>
      <td>
        <Link href={`/orders/${id}`}>
          <button
            className="relative mr-2 min-w-10 rounded-md bg-tertiary py-1 text-primary hover:bg-secondary"
            title="Detail"
          >
            <span className="flex items-center justify-center">
              <CgChevronRight className="mr-1" />
            </span>
          </button>
        </Link>
      </td>
    </tr>
  );
}

function ContainerOrders({ data }) {
  return (
    <div className="container-products mt-4  p-4 md:ml-20 ">
      <div className="overflow-x-auto rounded-xl border border-secondary px-7 py-5 ">
        <table className="table table-zebra ">
          {/* head */}
          <thead className="text-tertiary">
            <tr className="text-base ">
              <th>ID</th>
              <th>User</th>
              <th>No Resi</th>
              <th>Order Date</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className=" text-tertiary">
            {data.checkouts.map((d) => (
              <RowOrder
                key={d.id}
                date={new Date(d.createdAt).toDateString()}
                userName={d.user.username}
                id={d.id}
                noResi={d.resi}
                totalPrice={formatRupiah(d.totalPrice)}
                status={d.status}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContainerOrders;
