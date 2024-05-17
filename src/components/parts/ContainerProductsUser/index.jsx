'use client';

import CardProduct from '@/components/parts/CardProduct';

function ContainerProductsUser({ productsData }) {
  if (!productsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-products mt-4 grid grid-cols-2 gap-4 p-4 md:ml-20 md:grid-cols-3 xl:grid-cols-5">
      <CardProduct />
      {productsData.map((product) => (
        <CardProduct key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ContainerProductsUser;
