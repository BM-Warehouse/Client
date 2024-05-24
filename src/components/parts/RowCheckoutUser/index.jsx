import Link from 'next/link';

import Loading from '@/components/parts/Loading';
import formatRupiah from '@/lib/formatRupiah';

function RowCheckoutUser({ checkout }) {
  if (!checkout) {
    return <Loading />;
  }

  // let additionalCost = 0;
  // switch (checkout.courier) {
  //   case 'JNE':
  //     additionalCost = 54000;
  //     break;
  //   case 'JNT':
  //     additionalCost = 63000;
  //     break;
  //   case 'SiCepat':
  //     additionalCost = 33000;
  //     break;
  //   default:
  //     additionalCost = 0;
  // }

  // const fixTotalPrice = +checkout.totalPrice + additionalCost;

  return (
    <tr>
      <th>
        <Link href={`checkout-history/${checkout.id}`}>{checkout.id}</Link>
      </th>
      <td>
        <Link href={`checkout-history/${checkout.id}`}>{checkout.resi ? checkout.resi : '-'}</Link>
      </td>
      <td>
        <Link href={`checkout-history/${checkout.id}`}>{formatRupiah(checkout.totalPrice)}</Link>
      </td>
      <td>
        <Link href={`checkout-history/${checkout.id}`}>{checkout.address}</Link>
      </td>
      <td>
        <Link href={`checkout-history/${checkout.id}`}>{checkout.method}</Link>
      </td>
      <td>
        <Link href={`checkout-history/${checkout.id}`}>{checkout.couriers.name}</Link>
      </td>
      <td>
        <Link href={`checkout-history/${checkout.id}`}>{checkout.status}</Link>
      </td>
    </tr>
  );
}

export default RowCheckoutUser;
