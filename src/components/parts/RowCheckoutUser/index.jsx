import React from 'react';

function RowCheckoutUser({ checkout }) {
  return (
    <tr>
      <th>{checkout.id}</th>
      <td>
        {/* <Link href={`/products/${product.id}`}>{product.name}</Link> */}
        {checkout.resi ? checkout.resi : '-'}
      </td>
      <td>{checkout.totalPrice}</td>
      <td>{checkout.address}</td>
      <td>{checkout.method}</td>
      <td>{checkout.courier}</td>
      <td>{checkout.status}</td>
    </tr>
  );
}

export default RowCheckoutUser;
