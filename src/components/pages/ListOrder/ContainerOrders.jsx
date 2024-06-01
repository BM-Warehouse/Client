import { useContext } from 'react';

import toast from 'react-hot-toast';

import { ButtonPrimary, ButtonStrong } from '@/components/parts/Button';
import { confirmPayment, deleteCheckout, getAllOrders } from '@/fetching/orders';
import formatRupiah from '@/lib/formatRupiah';

import { ListOrderContext } from './context';

function RowOrder({ id, userName, noResi, totalPrice, status, date }) {
  const { setData, pagination } = useContext(ListOrderContext);
  // function onDetailButtonClick() {
  //   console.log('Here', id);
  // }
  const handleConfirm = () => {
    confirmPayment(id).then(() => {
      getAllOrders(pagination.currentPage)
        .then((res) => res.json())
        .then((res) => {
          setData(res.data.checkouts);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  const handleDelete = () => {
    deleteCheckout(id).then(() => {
      toast.success('Successfully delete the checkout list');
      getAllOrders(pagination.currentPage)
        .then((res) => res.json())
        .then((res) => {
          setData(res.data.checkouts);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  return (
    <tr>
      <td>{id || '-'}</td>
      <td>{userName || '-'}</td>
      <td>{noResi || '-'}</td>
      <td>{date || '-'}</td>
      <td>{totalPrice || '-'}</td>
      <td>{status || '-'}</td>
      <td>
        <ButtonPrimary icon="chevronR" href={`/orders/${id}`} title="Detail">
          Detail
        </ButtonPrimary>
        <ButtonPrimary
          icon="money"
          title="Confirm Payment"
          disable={status !== 'WAIT FOR PAYMENT'}
          onClick={handleConfirm}
        >
          Confirm
        </ButtonPrimary>
        <ButtonStrong icon="delete" title="Remove Checkout" onClick={handleDelete}>
          Delete
        </ButtonStrong>
      </td>
    </tr>
  );
}

function ContainerOrders({ data }) {
  return (
    <div className="container-products mt-4  p-4 md:ml-20 ">
      <div className="overflow-x-auto rounded-xl border border-secondary px-7 py-5 ">
        <table className="table table-zebra">
          {/* head */}
          <thead className="text-tertiary">
            <tr className="text-base ">
              <th>ID</th>
              <th>User</th>
              <th>No Resi</th>
              <th>Order Date</th>
              <th>Total Price</th>
              <th>Status</th>
              <th className="w-96">Action</th>
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
