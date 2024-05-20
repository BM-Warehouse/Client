import formatRupiah from '@/lib/formatRupiah';

function RowCheckoutUser({ checkout }) {
  if (!checkout) {
    return null;
  }

  let additionalCost = 0;
  switch (checkout.courier) {
    case 'JNE':
      additionalCost = 54000;
      break;
    case 'JNT':
      additionalCost = 63000;
      break;
    case 'SiCepat':
      additionalCost = 33000;
      break;
    default:
      additionalCost = 0;
  }

  const fixTotalPrice = +checkout.totalPrice + additionalCost;

  return (
    <tr>
      <th>{checkout.id}</th>
      <td>{checkout.resi ? checkout.resi : '-'}</td>
      <td>{formatRupiah(fixTotalPrice)}</td>
      <td>{checkout.address}</td>
      <td>{checkout.method}</td>
      <td>{checkout.courier}</td>
      <td>{checkout.status}</td>
    </tr>
  );
}

export default RowCheckoutUser;
