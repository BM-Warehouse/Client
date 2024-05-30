'use client';

import CardProduct from '@/components/parts/CardProduct';
import Loading from '@/components/parts/Loading';
import useSidebarStore from '@/store/sidebarStore';

function ContainerProductsUser({ productsData }) {
  const { expanded } = useSidebarStore();

  if (!productsData) {
    return <Loading />;
  }

  return (
    <div
      className={`container-products mt-4 grid grid-cols-2 gap-4 p-4 ${
        expanded ? 'md:ml-72 xl:grid-cols-4 ' : ' md:ml-20'
      }  md:grid-cols-3 xl:grid-cols-5`}
    >
      <CardProduct />
      {productsData.map((product) => (
        <CardProduct key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ContainerProductsUser;
