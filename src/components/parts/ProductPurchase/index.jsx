import Image from 'next/image';
import { RiDeleteBin5Line } from 'react-icons/ri';

import SusuBayik from '@/assets/images/susu-bayik.png';
import formatRupiah from '@/lib/formatRupiah';

function ProductPurchase({ product }) {
  if (!product) {
    return null;
  }
  return (
    <div className="product-purchase relative flex items-center border-b border-tertiary py-6">
      <figure className="max-w-28">
        <Image src={SusuBayik} alt="Imagesss" />
      </figure>
      <div className="product-purchase-body ml-10 ">
        <h4 className="mb-2 text-base font-bold">{product.product.name}</h4>
        {/* <p className="mb-2 text-sm">Food & Grocery</p> */}
        <p>
          <span>{product.quantityItem}</span> x <span>{formatRupiah(product.product.price)}</span>
        </p>
      </div>
      <button className="button-delete absolute right-0">
        <RiDeleteBin5Line className="hover:text-secondary" />
      </button>
    </div>
  );
}

export default ProductPurchase;
