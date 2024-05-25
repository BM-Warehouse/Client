// import Image from 'next/image';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { RiDeleteBin5Line } from 'react-icons/ri';

// import SusuBayik from '@/assets/images/susu-bayik.png';
import formatRupiah from '@/lib/formatRupiah';
import useCartStore from '@/store/cartStore';

function ProductPurchase({ product }) {
  const { asyncDeleteCartProduct, asyncShowCart } = useCartStore();

  const routePath = usePathname();

  if (!product) {
    return null;
  }

  const handleDelete = async () => {
    try {
      await asyncDeleteCartProduct(product.product.id);
      toast.success('Product removed from cart successfully!');
      await asyncShowCart();
    } catch (error) {
      console.error('Error deleting product from cart:', error.message);
      toast.error('Failed to remove product from cart.');
    }
  };
  return (
    <div className="product-purchase relative flex items-center border-b border-tertiary py-6">
      <figure className="max-w-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.product.imageUrl} alt="Imagesss" />
      </figure>
      <div className="product-purchase-body ml-10 ">
        <h4 className="mb-2 text-base font-bold">{product.product.name}</h4>
        {/* <p className="mb-2 text-sm">Food & Grocery</p> */}
        <p>
          <span>{product.quantityItem}</span> x <span>{formatRupiah(product.product.price)}</span>
        </p>
      </div>
      {routePath === '/checkout' && (
        <button onClick={handleDelete} className="button-delete absolute right-0">
          <RiDeleteBin5Line className="hover:text-secondary" />
        </button>
      )}
    </div>
  );
}

export default ProductPurchase;
